/*
 * Standard HTTP API Request
 * @param {Object} _params
 * @description The following are valid options to pass through:
 *  _params.timeout  	: int Timeout request
 *  _params.type		: string GET/POST
 *  _params.format		: string json, etc.
 *  _params.data		: mixed The data to pass
 *  _params.url			: string The url source to call
 *  _params.failure		: funtion A function to execute when there is an XHR error
 *  _params.success		: function when successful
 *  _params.passthrough : Any passthrough params
 *  _params.headers     : Array of request headers
 */

exports.request = function(apikey, callbacknya) {
	

	if(Ti.Network.online) {

		var url = Alloy.CFG.ApiUrl + apikey,
		http = Ti.Network.createHTTPClient();
		
		Ti.API.info( '===== Request this API ---> ' + url );

		http.onload = function() {
			callbacknya({data: JSON.parse(this.responseText)});
		};
		http.onerror = function(e) {
			Ti.API.debug(e.error);
			alert('No Internet Connection');

			return false;
		};
		http.open("GET", url, true);
		http.send();

	} else {
		Ti.API.info("No internet connection");
	}

};