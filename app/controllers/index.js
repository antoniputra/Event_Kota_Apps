var initAsmoyDate 	= require("asmoyDate"),
	asmoyDate 		= new initAsmoyDate(),
	dateResult 		= asmoyDate.getSetDay(),
	selectedCity 	= Alloy.Globals.City || 'All Cities';

Alloy.Globals.mainTab = $.mainTab;

for (var i = 0; i <= dateResult.totalDay; i++) {
	var tabData 	= dateResult.datas[i];

	var tab = Alloy.createController('event/browseMenu', {
	    title: 		tabData.day +', '+ tabData.calendar,
	    targetDate:'get_event_dates/?date='+ tabData.apiFormat +'&etype=null'
	}).getView();
	
	if(tabData.apiFormat == asmoyDate.get()) {
		var todayTab = i;
		Ti.API.info("It's TODAY : " + todayTab );
	}
	
	Alloy.Globals.mainTab.addTab(tab);
}

Alloy.Globals.mainTab.open();
Alloy.Globals.mainTab.setActiveTab(todayTab);

Alloy.Globals.mainTab.addEventListener('focus', function(e){

	var withCity	= Alloy.Globals.City ? '&city='+Alloy.Globals.City : '',
		targetAPI 	= e.source.targetDate + withCity;

	Ti.API.info('CHECK API TARGET -----> ' + targetAPI);

	Alloy.Globals.mainTab.activeTab.window.add(Alloy.createController("event/browse", {
		apiKey: targetAPI,
		infoData: 'Show Event at : '+ selectedCity
	}).getView());

});


/*menuWindow.addEventListener('blur',function(){
	menuWindow.setVisible(false);
	alert( 'lihat '+ menuWindow.getVisible() );
});*/



Alloy.Globals.mainTab.addEventListener('open', function(e) {
    var activity = Alloy.Globals.mainTab.activity;
 
    if( Alloy.Globals.Android.Api >= 11 ) {
        activity.actionBar.title = "Event Kota";
        activity.actionBar.displayHomeAsUp = true; 
        activity.actionBar.onHomeIconItemSelected = function() {

        	//// ---- Slider Menu, positioned on the left
        	var baseMenuWindow = Ti.UI.createWindow({
			    bottom:0,
			    left:0,
			    navBarHidden:true
			    /*fullscreen:true*/
			});

			var menuWindow = Ti.UI.createView({
			    top:0,
			    left:0,
			    width:'210',
			    backgroundColor:'#101010',
			    zIndex:50
			    // visible:false
			});

			var menuTitles = [ {title: 'Event'}, {title: 'MatahariLabs'} ];
			// Tableview
			var tableView = Ti.UI.createTableView({
			    data:menuTitles,
			    width:Ti.UI.FILL,
			    rowHeight: 75,
			    color: '#fff',
			    separatorColor : "#BFBFBF",
			    font : {
					fontSize : 22,
					fontFamily:'Arial',
					fontWeight : "bold"
				}
			});

			var buttonClose = Titanium.UI.createButton({
				title: 'Close',
				bottom: 10,
				width: 100,
				height: 50
			});
			buttonClose.addEventListener('click',function(e)
			{
				// Start the animation when the event is called
				/*menuWindow.animate({
					left:-220,
					duration:100
				});*/
				baseMenuWindow.animate({
					left:-220,
					duration:100
				}, function() {
					baseMenuWindow.close();
				});
			});

			menuWindow.add(tableView);
			menuWindow.add(buttonClose);
			baseMenuWindow.add(menuWindow);
			baseMenuWindow.open({
				modal:true,
				activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
			    activityExitAnimation: Ti.Android.R.anim.slide_out_right
			});
        };
    }

    /*activity.startActivityForResult(intent, function(e) {
	    // The request code used to start this Activity
	    var requestCode = e.requestCode;
	    Ti.API.info('REQUESTCODE ----> ' + JSON.stringify(requestCode));
	    // The result code returned from the activity 
	    // (http://developer.android.com/reference/android/app/Activity.html#StartingActivities)
	    var resultCode = e.resultCode;
	    Ti.API.info('RESULTCODE ----> ' + JSON.stringify(resultCode));
	    // A Titanium.Android.Intent filled with data returned from the Activity
	    var intent = e.intent;
	    Ti.API.info('INTENT ----> ' + JSON.stringify(intent));
	    // The Activity the received the result
	    var source = e.source;
	    Ti.API.info('SOURCE ----> ' + JSON.stringify(source));
	});*/
 
    activity.onCreateOptionsMenu = function(e) {
        var menu = e.menu,
        	staticCityAction = Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW;

        // for Search Button
        var menuItem2 = menu.add({
            title : "Search",
            icon  : "global/search.png",
            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
        });
        menuItem2.addEventListener("click", function(e) {
            Alloy.createController('event/search').getView();
        });
        

        var menuItem1 = menu.add({
            title : "All Cities",
            showAsAction : staticCityAction
        });
        var menuItem2 = menu.add({
            title : "Jakarta",
            showAsAction : staticCityAction
        });
        var menuItem3 = menu.add({
            title : "Bandung",
            showAsAction : staticCityAction
        });
        var menuItem4 = menu.add({
            title : "Yogyakarta",
            showAsAction : staticCityAction
        });
        var menuItem5 = menu.add({
            title : "Surabaya",
            showAsAction : staticCityAction
        });

        menuItem1.addEventListener("click", function(e) {
			var browseView = Alloy.Globals.mainTab.activeTab.window.getChildren();
			// Ti.API.debug( '!!!!!!!! Lihat Prend : ' + JSON.stringify(browseView) );
        	Alloy.Globals.City = '';
        	Alloy.Globals.mainTab.activeTab.window.remove(browseView[0]);
        	addBrowseContent();
        });
        menuItem2.addEventListener("click", function(e) {
			var browseView = Alloy.Globals.mainTab.activeTab.window.getChildren();
        	Alloy.Globals.City = e.source.title;
        	Alloy.Globals.mainTab.activeTab.window.remove(browseView[0]);
        	addBrowseContent();
        });
        menuItem3.addEventListener("click", function(e) {
			var browseView = Alloy.Globals.mainTab.activeTab.window.getChildren();
        	Alloy.Globals.City = e.source.title;
        	Alloy.Globals.mainTab.activeTab.window.remove(browseView[0]);
        	addBrowseContent();
        });
        menuItem4.addEventListener("click", function(e) {
			var browseView = Alloy.Globals.mainTab.activeTab.window.getChildren();
        	Alloy.Globals.City = e.source.title;
        	Alloy.Globals.mainTab.activeTab.window.remove(browseView[0]);
        	addBrowseContent();
        });
        menuItem5.addEventListener("click", function(e) {
			var browseView = Alloy.Globals.mainTab.activeTab.window.getChildren();
        	Alloy.Globals.City = e.source.title;
        	Alloy.Globals.mainTab.activeTab.window.remove(browseView[0]);
        	addBrowseContent();
        });
    };
});

function addBrowseContent()
{
	selectedCity 	= Alloy.Globals.City || 'All Cities';

	var withCity	= Alloy.Globals.City ? '&city='+Alloy.Globals.City : '',
		targetAPI 	= Alloy.Globals.mainTab.activeTab.targetDate + withCity;

	return Alloy.Globals.mainTab.activeTab.window.add(Alloy.createController("event/browse", {
		apiKey: targetAPI,
		infoData: 'Show Event at : '+ selectedCity
	}).getView());
}