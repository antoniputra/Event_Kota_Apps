function serviceApi() {
	/*this.firstName = firstName;
	this.lastName = lastName;*/
}

serviceApi.prototype.fullName = function() {
	/*return this.firstName+' '+this.lastName;*/
};

serviceApi.prototype.getEventByDate = function(params, results) {

	/*Ti.API.info('SERVICE API params : ' + params.apikey + ' testing : ' + params.testing);
	alert(params.apikey + ' -- ' + params.testing);*/

	var api = require("http");

	api.request(params.apikey, function(callbacknya) {
		results(callbacknya);
	});

	/*function getResult(data)
	{
		Ti.API.debug('HARUSNYA INI JSON' + data.posts);
		alert('hello event ' + data.posts[0].title);

		return data;
	}*/

};

module.exports = serviceApi;