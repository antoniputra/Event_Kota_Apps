Alloy.Globals.MainController = $;

Alloy.Globals.MainWindow = $.mainWindow;

Alloy.Globals.MainWindow.open();

// Alloy.Globals.EventBrowse = Alloy.createController("event/browse");

initHome();

function initHome()
{
	Ti.API.info('masuk initHome');

	/*var setServiceApi = require("serviceApi");
	var serviceApi	= new setServiceApi();*/
	
	Alloy.Globals.serviceApi.getEventByDate({
		apikey:'get_date_posts/?date=2014-01&post_type=event&pages=1'
		// apikey:'get_posts/'
	}, function(results) {
		Alloy.Globals.MainWindow.add( Alloy.createController("event/browse", results).getView() );
	});

	// Alloy.Globals.MainWindow.add(Alloy.Globals.EventBrowse.getView());
	// Alloy.Globals.EventBrowse.open();
}