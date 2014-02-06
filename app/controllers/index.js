Alloy.Globals.MainWindow = $.mainWindow;

Alloy.Globals.MainWindow.open();

initHome();

function initHome()
{
	Ti.API.info('===== Home ---> for show Event Today =====');

	var currentDate = Alloy.Globals.getCurrentDate('yyyy-mm-dd'),
		eventToday = 'get_date_posts/?date='+ currentDate +'&post_type=event&pages=1';
	
	Alloy.Globals.serviceApi.getEventByDate({
		apikey: eventToday
	}, function(results) {
		results.apiKey = eventToday;
		Ti.API.debug( '===== Debug JSON API ---> ' + JSON.stringify(results) );
		Alloy.Globals.MainWindow.add( Alloy.createController("event/browse", results).getView() );
	});
}