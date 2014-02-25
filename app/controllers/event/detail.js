// var args = arguments[0] || {};

var moment 		= require('alloy/moment');

exports.setDetailEvent = function(apiKey) {
	Alloy.Globals.serviceApi.getEventByDate({
		apikey: apiKey
	}, function(results) {
		// hide loading
		// $.detail.remove(loading);
		var item = results.data.post;
		
		$.bannerImage.image = ( typeof(item.thumbnail_images) != 'undefined' && item.thumbnail_images !== null ) ? item.thumbnail_images.full.url : '';
		$.categoryLabel.text= 'Some Category';
		$.titleLabel.text 	= item.title_plain;

		var st_date	= (typeof item.custom_fields.st_date != 'undefined') ? item.custom_fields.st_date[0] : '';
		st_date = (st_date) ? moment(st_date, "YYYY-MM-DD").format("D MMMM, YYYY") : '';

		var end_date = (typeof item.custom_fields.end_date != 'undefined') ? item.custom_fields.end_date[0] : '';
		end_date = (end_date) ? moment(end_date, "YYYY-MM-DD").format("D MMMM, YYYY") : '';

		var st_time		= (typeof item.custom_fields.st_time != 'undefined') ? item.custom_fields.st_time[0] : '';
		var end_time 	= (typeof item.custom_fields.end_time != 'undefined') ? item.custom_fields.end_time[0] : '';

		Ti.API.info('Lihat Date Detail Event : ' + st_date + ' <---> ' + end_date + ' <---> ' + st_time + ' <---> ' + end_time);
		$.buttonViewMap.eventMapData 	= item;

		$.infoDate.text 	= st_date +' - '+ end_date;
		$.infoTime.text 	= st_time +' - '+ end_time;
		$.infoLocation.text	= (typeof item.custom_fields.address != 'undefined') ? item.custom_fields.address[0] : '-';
		$.infoPhone.text	= (typeof item.custom_fields.phone != 'undefined') ? item.custom_fields.phone[0] : '-';
		$.detailContent.text = (typeof item.content != 'undefined') ? helper.strip_tags(item.content, '') : '-';
		// $.detailContent.html = (typeof item.content != 'undefined') ? '<html><body>'+ item.content +'</body></html>': 'Tidak ada deskripsi';
	});
}

/*var loading = Alloy.Globals.showLoading();
$.detail.add(loading);
loading.show();*/

/*Alloy.Globals.serviceApi.getEventByDate({
	apikey: args.apiKey
}, function(results) {
	// hide loading
	// $.detail.remove(loading);
	renderDetail(results);
});*/


/*function renderDetail(params)
{
	var item = params.data.post;
	
	$.bannerImage.image = ( typeof(item.thumbnail_images) != 'undefined' && item.thumbnail_images !== null ) ? item.thumbnail_images.full.url : '';
	$.categoryLabel.text= 'Some Category';
	$.titleLabel.text 	= item.title_plain;

	var st_date	= (typeof item.custom_fields.st_date != 'undefined') ? item.custom_fields.st_date[0] : '';
	st_date = (st_date) ? moment(st_date, "YYYY-MM-DD").format("D MMMM, YYYY") : '';

	var end_date = (typeof item.custom_fields.end_date != 'undefined') ? item.custom_fields.end_date[0] : '';
	end_date = (end_date) ? moment(end_date, "YYYY-MM-DD").format("D MMMM, YYYY") : '';

	var st_time		= (typeof item.custom_fields.st_time != 'undefined') ? item.custom_fields.st_time[0] : '';
	var end_time 	= (typeof item.custom_fields.end_time != 'undefined') ? item.custom_fields.end_time[0] : '';

	Ti.API.info('Lihat Date Detail Event : ' + st_date + ' <---> ' + end_date + ' <---> ' + st_time + ' <---> ' + end_time);
	$.buttonViewMap.eventMapData 	= item;

	$.infoDate.text 	= st_date +' - '+ end_date;
	$.infoTime.text 	= st_time +' - '+ end_time;
	$.infoLocation.text	= (typeof item.custom_fields.address != 'undefined') ? item.custom_fields.address[0] : '-';
	$.infoPhone.text	= (typeof item.custom_fields.phone != 'undefined') ? item.custom_fields.phone[0] : '-';
	// $.detailContent.text = (typeof item.content != 'undefined') ? helper.strip_tags(item.content, '') : '-';
	$.detailContent.html = (typeof item.content != 'undefined') ? '<html><body>'+ item.content +'</body></html>': 'Tidak ada deskripsi';

	// $.detail.open();

	// $.detail.addEventListener('open', function(e) {
	//     var activity = $.detail.activity;
	 
	//     if( Alloy.Globals.Android.Api >= 11 ) {
	//         activity.actionBar.title = "Event : " + item.title_plain;
	//         activity.actionBar.displayHomeAsUp = true; 
	//         activity.actionBar.onHomeIconItemSelected = function() {
	//             $.detail.close();
	//         };
	//     }
	// });
}*/


function doViewMap(e)
{
	var eventData = e.source.eventMapData;
	var MapModule = require('ti.map');
	
	var rc = MapModule.isGooglePlayServicesAvailable();
	switch (rc) {
	    case MapModule.SUCCESS:
	        Ti.API.info('Google Play services is installed.');
	        break;
	    case MapModule.SERVICE_MISSING:
	        alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
	        break;
	    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
	        alert('Google Play services is out of date. Please update Google Play services.');
	        break;
	    case MapModule.SERVICE_DISABLED:
	        alert('Google Play services is disabled. Please enable Google Play services.');
	        break;
	    case MapModule.SERVICE_INVALID:
	        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
	        break;
	    default:
	        alert('Unknown error.');
	        break;
	}

	var win = Ti.UI.createWindow({
		layout: 'vertical',
		backgroundColor: 'white',
		font:{fontSize:16},
		title: eventData.title_plain,
		fullscreen:false
	});

	var eventPin = [
	    MapModule.createAnnotation({
	        latitude: eventData.custom_fields.geo_latitude[0] || 0,
	        longitude: eventData.custom_fields.geo_longitude[0] || 0,
	        title: eventData.title_plain,
	        subtitle: eventData.custom_fields.address[0] || '',
	        pincolor: MapModule.ANNOTATION_RED,
	        myid:1
	        // leftButton: 'appcelerator.gif'
	    })
	];

	var mapEvent = MapModule.createView({
	    userLocation: true,
	    mapType: MapModule.NORMAL_TYPE,
	    animate: true,
	    region: {
	    	latitude: eventData.custom_fields.geo_latitude[0] || 0,
	    	longitude: eventData.custom_fields.geo_longitude[0] || 0,
	    	latitudeDelta: 0.01,
	    	longitudeDelta: 0.01
	    },
	    regionFit:true,
	    annotations: eventPin,
	    top: 0,
	    height: Ti.UI.FILL,
	    width: Ti.UI.FILL
	});

	win.add(mapEvent);
	win.open();
}

function doShare(e)
{
	alert('I am doShare Method'+ e.source);
}

function report(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
}