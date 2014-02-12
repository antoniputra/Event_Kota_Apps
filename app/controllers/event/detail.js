var args = arguments[0] || {},
	moment 		= require('alloy/moment');

var loading = Alloy.Globals.showLoading('Retrieving Events...');
$.detail.add(loading);
loading.show();

Alloy.Globals.serviceApi.getEventByDate({
	apikey: args.apiKey
}, function(results) {
	// hide loading
	$.detail.remove(loading);

	Ti.API.debug( '===== Debug JSON API at method Detail ---> ' + JSON.stringify(results) );
	renderDetail(results);
});

function renderDetail(params) 
{
	var item = params.data.post;
	
	$.bannerImage.image = item.thumbnail_images.full.url;
	$.categoryLabel.text= 'Some Category';
	$.titleLabel.text 	= item.title_plain;

	var st_date	= (typeof item.custom_fields.st_date != 'undefined') ? item.custom_fields.st_date[0] : '';
	st_date = (st_date) ? moment(st_date, "YYYY-MM-DD").format("D MMMM, YYYY") : '';

	var end_date = (typeof item.custom_fields.end_date != 'undefined') ? item.custom_fields.end_date[0] : '';
	end_date = (end_date) ? moment(end_date, "YYYY-MM-DD").format("D MMMM, YYYY") : '';

	var st_time		= (typeof item.custom_fields.st_time != 'undefined') ? item.custom_fields.st_time[0] : '';
	var end_time 	= (typeof item.custom_fields.end_time != 'undefined') ? item.custom_fields.end_time[0] : '';

	Ti.API.info('Lihat Isinya  : ' + st_date + ' <---> ' + end_date + ' <---> ' + st_time + ' <---> ' + end_time);

	$.infoDate.text 	= st_date +' - '+ end_date;
	$.infoTime.text 	= st_time +' - '+ end_time;
	$.infoLocation.text	= (typeof item.custom_fields.address != 'undefined') ? item.custom_fields.address[0] : '-';
	$.infoPhone.text	= (typeof item.custom_fields.phone != 'undefined') ? item.custom_fields.phone[0] : '-';
	$.detailContent.text = (typeof item.content != 'undefined') ? helper.strip_tags(item.content, '') : '-';
}

function doAttending(e)
{
	alert('I am doAttending Method'+ e.source);
}

function doViewMap(e)
{
	alert('I am doViewMap Method'+ e.source);
}

function doShare(e)
{
	alert('I am doShare Method'+ e.source);
}