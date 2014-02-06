var args = arguments[0] || {};

Ti.API.debug( '===== Debug ALL ARGUMENTS ---> ' + JSON.stringify(args) );
Ti.API.debug( '===== Debug Arguments ---> ' + JSON.stringify(args.objName) );

alert(' test1 ' + args.objName);


$.yesterdayLabel.text		= args.yesterdayLabel || 'Yesterday';
$.yesterdayLabel.objName	= args.objName;

$.todayLabel.text 		= args.todayLabel || 'Today';

$.tomorrowLabel.text 	= args.tomorrowLabel || 'Tomorrow';


function changeDate(e) {
	Ti.API.debug( '===== Debug Element browseMenu ---> ' + JSON.stringify(e) );
	var obj = e.source;
	Ti.API.debug( '===== Debug Element browseMenu OBJ ---> ' + JSON.stringify(obj) );
	alert(JSON.stringify(obj));

	if(obj.id == 'yesterdayLabel') {
		var changeToDate = 'get_date_posts/?date=2014-02-05&post_type=event&pages=1';
		Ti.API.info( '========== IKI TARGET DATE YESTERDAY ========== ' + changeToDate );
	} else if(obj.id == 'todayLabel') {
		var changeToDate = 'get_date_posts/?date='+ Alloy.Globals.getCurrentDate('yyyy-mm-dd') +'&post_type=event&pages=1';
		Ti.API.info( '========== IKI TARGET DATE TODAY ========== ' + changeToDate );
	} else if(obj.id == 'tomorrowLabel') {
		var changeToDate = 'get_date_posts/?date=2014-02-07&post_type=event&pages=1';
		Ti.API.info( '========== IKI TARGET DATE TOMORROW ========== ' + changeToDate );
	}
	
	Alloy.Globals.serviceApi.getEventByDate({
		apikey: changeToDate
	}, function(results) {
		results.apiKey = changeToDate;
		Ti.API.debug( '===== Debug JSON API CHANGE DATE PREND---> ' + JSON.stringify(results) );
		Alloy.Globals.MainWindow.add( Alloy.createController("event/browse", results).getView() );
	});
}