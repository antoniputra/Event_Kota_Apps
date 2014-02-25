/*
 * Standard Manage Date
 * @param {Object} _params
 * @description The following are valid options to pass through:
 *  _params.setValue  	: int Timeout request
 *  _params.setType		: string GET/POST
 */
function asmoyDate(_params) {

	this.moment = require('alloy/moment');

	if(!_params) _params = {};

	// Validation _params
	this.getValue 	= _params.setValue || 1;
	this.getType 	= (_params.setType != 'date' || _params.setType != 'month' || _params.setType != 'year') ? 'week' : _params.setType;
	this.totalDay 	= _params.totalDay || 13;
	this.getFormat 	= 'MMM D';
	this.getApiFormat 	= 'YYYY-MM-DD';
}

asmoyDate.prototype.getSetDay = function()
{
	var dateResult 	= {};
	dateResult.datas 		= [];
	dateResult.format 		= this.getFormat;
	dateResult.apiFormat 	= this.getApiFormat;
	dateResult.totalDay 	= this.totalDay;

	for (var i = 1; i <= this.totalDay+1; i++)
	{
		var ii = i - (this.totalDay/2);
		dateResult.datas.push({
			'day': this.moment().day(ii).format('dddd'),
			'calendar': this.moment().day(ii).format(this.getFormat),
			'apiFormat': this.moment().day(ii).format(this.getApiFormat)
		});
	}

	// Ti.API.info("Lihat Hasil : " + JSON.stringify(dateResult) );

	return dateResult;
};

asmoyDate.prototype.get = function(setFormat)
{
	var getFormat = setFormat || this.getApiFormat;
	return this.moment().format(getFormat);
};

asmoyDate.prototype.getYesterday = function(setFormat)
{
	var getFormat = setFormat || this.getApiFormat;
	return this.moment().subtract('days', 1).format(getFormat);
};

asmoyDate.prototype.getTomorrow = function(setFormat)
{
	var getFormat = setFormat || this.getApiFormat;
	return moment().add('days', 1).format(getFormat);
};

module.exports = asmoyDate;