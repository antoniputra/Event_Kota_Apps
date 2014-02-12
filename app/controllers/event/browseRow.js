var args = arguments[0] || {};

var row 		= $.tableRow;
var rowView 	= $.tableRowView;
var rowImage 	= $.tableRowImage;
var rowTime 	= $.tableRowTime;
var rowTitle 	= $.tableRowTitle;
var rowAddress 	= $.tableRowAddress;

row.rowIndex 		= args.number;
rowImage.image 	= args.image;
rowTime.text 	= args.start_at + ' - ' + args.finish_at;
rowTitle.text 	= args.title;
rowAddress.text	= args.address;

/*rowView.apiDetail	= args.apiDetail;
rowImage.apiDetail	= args.apiDetail;
rowTime.apiDetail	= args.apiDetail;
rowAddress.apiDetail= args.apiDetail;*/
rowTitle.apiDetail	= args.apiDetail;

rowTitle.addEventListener('click', function(e) {
	/*if (e.source && e.source.objName !== 'table'){
		Ti.API.info('Row swiped: ' + e.source);
		Ti.API.info('Row swiped: ' + e.source.objName);
		Ti.API.info('Row ID : ' + e.source.rowID);
	}*/
	// alert('Lihat Detail : '+ e.source.apiDetail);
	Ti.API.info('Lihat e.source prend  : ' + JSON.stringify(e.source) );
	Alloy.createController( 'event/detail', {apiKey: e.source.apiDetail} ).getView().open();
});