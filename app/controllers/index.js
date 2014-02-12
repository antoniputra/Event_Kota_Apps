
/*var args = arguments[0] || {};
Alloy.Globals.MainWindow = $.mainWindow;
Alloy.Globals.MainWindow.open();*/

initHome();

function initHome()
{
	// Get an instance of the browseMenu view
	var initAsmoyDate 	= require("asmoyDate"),
		asmoyDate 		= new initAsmoyDate();
	var dateResult 		= asmoyDate.getSetDay();

	for (var i = 0; i <= 13; i++) {
    	var tabData 	= dateResult.datas[i];

    	var mywin = Titanium.UI.createWindow({
    		id: 'win_'+tabData.apiFormat,
    		title: "Events at "+ tabData.calendar
    	});
		var tab = Titanium.UI.createTab({
		    window: mywin,
		    id: 'tab_'+tabData.apiFormat,
		    title: tabData.day +', '+ tabData.calendar,
		    targetDate: 'get_event_dates/?date='+ tabData.apiFormat +'&post_type=event&pages=1'
		});
		
		/*var browseMenu 	= Alloy.createController('event/browseMenu').getView();
		browseMenu.title	= tabData.day +', '+ tabData.calendar;
		browseMenu.id 		= tabData.apiFormat;*/

		// Ti.API.info("Check Today : " + tabData.apiFormat + ' == '+ asmoyDate.getNow('YYYY-MM-DD | h:mm:ss a') );
		
		if(tabData.apiFormat == asmoyDate.get()) {
			var todayTab 	= i;
			Ti.API.info("It's TODAY : " + todayTab );
		}
		
		$.mainTab.addTab(tab);
	}

	$.mainTab.open();
	$.mainTab.setActiveTab(todayTab);

	$.mainTab.addEventListener('focus', function(e){
		var tabWindow = $.mainTab.activeTab.window;

		tabWindow.add(Alloy.createController("event/browse", {apiKey: e.source.targetDate}).getView());
	});

	$.mainTab.addEventListener('open', function(e) {
	    var activity = $.mainTab.activity;
	 
	    if( Alloy.Globals.Android.Api >= 11 ) {
	        activity.actionBar.title = "Event Kota";
	        activity.actionBar.displayHomeAsUp = true; 
	        activity.actionBar.onHomeIconItemSelected = function() {
	            alert("Home icon clicked!");
	        };
	    }
	 
	    // Menu Item Specific Code
	    activity.onCreateOptionsMenu = function(e) {
	        var menu = e.menu;
	         
	        // Menu Item 1
	        var menuItem1 = menu.add({
	            title : "Item 1",
	            icon  : "images/action_about.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
	        });
	        menuItem1.addEventListener("click", function(e) {
	            alert("I was clicked 1");
	        });   
	         
	        // Menu Item 2
	        var menuItem2 = menu.add({
	            title : "Item 2",
	            icon  : "images/action_settings.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
	        });
	        menuItem2.addEventListener("click", function(e) {
	            alert("I was clicked 2");
	        });
	    };
	});
}


/*function initHome()
{
	Ti.API.info('===== Method initHome ---> for list Event Today =====');

	Alloy.Globals.MainWindow = $.mainWindow;
	Alloy.Globals.MainWindow.open();

	Alloy.Globals.showLoading(null, function(callback)
	{
		Alloy.Globals.MainWindow.add(callback);
		callback.show();
	});

	var currentDate = Alloy.Globals.getCurrentDate('yyyy-mm-dd'),
		eventToday = 'get_date_posts/?date='+ currentDate +'&post_type=event&pages=1';
	
	Alloy.Globals.serviceApi.getEventByDate({
		apikey: eventToday
	}, function(results) {
		results.apiKey = eventToday;
		Ti.API.debug( '===== Debug JSON API ---> ' + JSON.stringify(results) );
		Alloy.Globals.MainWindow.remove(loading);
		Alloy.Globals.MainWindow.add( Alloy.createController("event/browse", results).getView() );
	});
}*/