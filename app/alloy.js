if( OS_ANDROID ) {
	// Declare Android API
    Alloy.Globals.Android = { 
        "Api" : Ti.Platform.Android.API_LEVEL
    };

    // Declare Map Module
    // Ti.Map = require('ti.map');
}/* else if (OS_IOS) {
	var parts = Ti.version.split('.'),
		major = parseInt(parts[0], 10),
		minor = parseInt(parts[1], 10);

	if (major > 3 || (major === 3 && minor >= 2)) {
		Ti.Map = require('ti.map');
	}
}*/

// Declare Map Module
Ti.Map = require('ti.map');

var helper = require("helper");

Alloy.Globals.setServiceApi = require("serviceApi");
Alloy.Globals.serviceApi	= new Alloy.Globals.setServiceApi();

Alloy.Globals.showLoading = function(message, callback) {

	var loading = Ti.UI.createActivityIndicator({
		message: message || "  Loading... ",
		backgroundColor: "#000000",
		color: "#ffffff",
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		borderRadius: 8,
		opacity: 0.8,
		font: {
			fontSize: 18,
			fontWeight: "bold"
		}
	});

	return loading;
};

Alloy.Globals.hideLoading = function(container) {
	container.remove(loading);
	loading = null;
};