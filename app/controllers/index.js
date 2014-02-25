var initAsmoyDate 	= require("asmoyDate"),
	asmoyDate 		= new initAsmoyDate(),
	dateResult 		= asmoyDate.getSetDay(),
	selectedCity 	= Alloy.Globals.City || 'Semua Kota';

Alloy.Globals.mainTab = $.mainTab;

for (var i = 0; i <= dateResult.totalDay; i++) {
	var tabData 	= dateResult.datas[i];

	// get yesterday
	if( tabData.apiFormat == asmoyDate.getYesterday() ) {
		var tabTitle = 'Kemarin';
	}
	// get today
	else if( tabData.apiFormat == asmoyDate.get() ) 
	{
		var todayTab = i;
		var tabTitle = 'Hari ini';
		Ti.API.info("It's TODAY : " + todayTab );
	}
	// get tomorrow
	else if( tabData.apiFormat == asmoyDate.getTomorrow() ) 
	{
		var tabTitle = 'Besok';
	}
	// other
	else 
	{
		var tabTitle = tabData.day +', '+ tabData.calendar;
	}

	var tab = Alloy.createController('event/browseMenu', {
	    title: 		tabTitle,
	    targetDate: 'get_events/?date='+ tabData.apiFormat +'&etype=null&pages=1',
	    opened: 	false
	}).getView();
	
	Alloy.Globals.mainTab.addTab(tab);
}

Alloy.Globals.mainTab.open();
Alloy.Globals.mainTab.setActiveTab(todayTab);

Alloy.Globals.mainTab.addEventListener('focus', function(e){
	if(e.source.opened == false)
	{
		addBrowseContent(e.source.targetDate);
		e.source.opened = true;
	}
});

function addBrowseContent(paramsApiKey)
{
	selectedCity 	= Alloy.Globals.City || 'Semua Kota';

	var ApiKey 		= (paramsApiKey) ? paramsApiKey : Alloy.Globals.mainTab.activeTab.targetDate,
		withCity	= (Alloy.Globals.City) ? '&city='+Alloy.Globals.City : '',
		targetAPI 	=  ApiKey + withCity;

	return Alloy.Globals.mainTab.activeTab.window.add(Alloy.createController("event/browse", {
		apiKey: targetAPI,
		infoData: 'Tampilkan Event di : '+ selectedCity
	}).getView());
}



// Slider Menu, positioned on the left
var baseMenuWindow = Ti.UI.createWindow({
    bottom:0,
    left:0,
    navBarHidden:true
});

var menuView = Ti.UI.createView({
    top:0,
    left:-210,
    width:'210',
    backgroundColor:'#101010',
    zIndex:50
});

var menuTitles = [ {title: 'Event', height:47}, {title: 'MatahariLabs', height: 47} ];
// Tableview
var tableView = Ti.UI.createTableView({
    data:menuTitles,
    color: '#fff',
    separatorColor : "#999",
    font : {
		fontSize : 25,
		fontFamily:'Arial',
		fontWeight : "bold"
	}
});

// animation onOpen
baseMenuWindow.addEventListener('open',function(e)
{
	menuView.animate({
		left:0,
		duration:220
	});
});

// animation onClose
baseMenuWindow.addEventListener('androidback',function(e)
{
	menuView.animate({
		left:-210,
		duration:220
	}, function() {
		baseMenuWindow.close();
	});
});

// animation onBlur
baseMenuWindow.addEventListener('click',function(e)
{
	menuView.animate({
		left:-210,
		duration:220
	}, function() {
		baseMenuWindow.close();
	});
});

menuView.add(tableView);
baseMenuWindow.add(menuView);


// Create Modal Window for list City
var winLocation = Ti.UI.createWindow({navBarHidden:true});

var cityData 		= helper.staticCityData,
	dataRowCity		= [];
for(c in cityData)
{
	var rowCity = Ti.UI.createTableViewRow({
        title : cityData[c],
        height: 50,
        backgroundSelectedColor: '#4e4eff',
        color:'#222',
        left:'20dp'
    });
    dataRowCity.push(rowCity);
}
var tableCity 	= Ti.UI.createTableView({
	data: dataRowCity,
	backgroundColor: '#fff',
	backgroundSelectedColor: '#4e4eff',
	separatorColor : '#d0d0d0'
});

var viewLocation = Ti.UI.createView({
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE,
	zIndex:50,
	top:100, right:50, bottom:50, left:50
});

viewLocation.add(tableCity);

winLocation.add(viewLocation);

tableCity.addEventListener("click", function(e) {
	winLocation.close();
	var browseView 		= Alloy.Globals.mainTab.activeTab.window.getChildren();
	Alloy.Globals.City 	= (e.source.title == 'Semua Kota') ? '' : e.source.title;
	Alloy.Globals.mainTab.activeTab.window.remove(browseView[0]);
	addBrowseContent();
});

// animation onBlur
winLocation.addEventListener('click',function(e)
{
	winLocation.close();
});

// CREATE SEARCH WINDOW
var searchWin = Alloy.createController('event/search').getView();

//  Create Activity for TabGroup
Alloy.Globals.mainTab.addEventListener('open', function(e) {
    var activity = Alloy.Globals.mainTab.activity;
 
    if( Alloy.Globals.Android.Api >= 11 ) {
        activity.actionBar.title = "Event Kota";
        activity.actionBar.displayHomeAsUp = true; 
        activity.actionBar.onHomeIconItemSelected = function() {
			baseMenuWindow.open({
				modal:true,
				// activityEnterAnimation: Ti.Android.R.anim.slide_in_left
			});
        };
    }
 
    activity.onCreateOptionsMenu = function(e) {
        var menu = e.menu;

        // for Search Button
        var searchMenu = menu.add({
            title : "Search",
            icon  : "global/search.png",
            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
        });
        searchMenu.addEventListener("click", function(e) {
            searchWin.open();
        });

        // for Location Button
        var locationMenu = menu.add({
            title : "Location",
            icon  : "global/location.png",
            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
        });
        locationMenu.addEventListener("click", function(e) {
            winLocation.open({
            	modal:true,
            	activityEnterAnimation: Ti.Android.R.anim.fade_in,
            	activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        });
    };
});