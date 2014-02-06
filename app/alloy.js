// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

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