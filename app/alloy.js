if( OS_ANDROID ) {
    Alloy.Globals.Android = { 
        "Api" : Ti.Platform.Android.API_LEVEL
    };
}

var helper = require("helper");

Alloy.Globals.setServiceApi = require("serviceApi");
Alloy.Globals.serviceApi	= new Alloy.Globals.setServiceApi();
Alloy.Globals.getCurrentDate = function(format)
{
	if(!format) {
		format = 'dd-mm-yyyy';
	}

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd < 10) { dd ='0'+dd; }
	if(mm < 10) { mm ='0'+mm; }

	if( format == 'dd-mm-yyyy' ) {
		today = dd+'-'+mm+'-'+yyyy;
	} else if( format == 'mm-dd-yyyy' ) {
		today = mm+'-'+dd+'-'+yyyy;
	} else if( format == 'yyyy-mm-dd' ) {
		today = yyyy+'-'+mm+'-'+dd;
	}
	
	return today;
};

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