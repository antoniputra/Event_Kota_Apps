function serviceApi() {
	/*this.firstName = firstName;
	this.lastName = lastName;*/
}

serviceApi.prototype.fullName = function() {
	/*return this.firstName+' '+this.lastName;*/
};

serviceApi.prototype.getEventByDate = function(params, results) {

	var api = require("http");

	api.request(params.apikey, function(callbacknya) {
		results(callbacknya);
	});

};

module.exports = serviceApi;