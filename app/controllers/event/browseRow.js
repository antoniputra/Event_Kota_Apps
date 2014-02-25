var args = arguments[0] || {};

var row 		= $.tableRow;
var rowView 	= $.tableRowView;
var rowImage 	= $.tableRowImage;
var rowTime 	= $.tableRowTime;
var rowTitle 	= $.tableRowTitle;
var rowAddress 	= $.tableRowAddress;

row.rowIndex 	= args.number;
// row.backgroundSelectedColor = 'transparent';

rowView.apiDetail 		= args.apiDetail;
rowView.backgroundColor = '#202020';
rowView.touchEnabled	= false;

rowImage.image 			= args.image;
rowImage.touchEnabled 	= false;

rowTime.text 			= args.start_at + ' - ' + args.finish_at;
rowTime.touchEnabled 	= false;

rowTitle.text 			= args.title;
rowTitle.touchEnabled 	= false;

rowAddress.text			= args.address;
rowAddress.touchEnabled = false;

$.tableImageView.touchEnabled 	= false;
$.tableDataView.touchEnabled 	= false;

/*rowView.addEventListener('click', function(e) {
    rowView.backgroundColor = '#4e4eff';
    setTimeout(function() {
        rowView.backgroundColor = '#202020';
    }, 70);

	var conDetail 	= Alloy.createController('event/detail');
    winDetail 		= conDetail.getView();

    Ti.API.info( 'CHECK : '+ JSON.stringify(e.source) );
    Ti.API.info( 'CHECK 2 : '+ JSON.stringify(e.source.parent) );

    conDetail.setDetailEvent(e.source.parent.apiDetail);

    winDetail.open();

    winDetail.addEventListener('open', function(e) {
	    var activity = winDetail.activity;
	 
	    if( Alloy.Globals.Android.Api >= 11 ) {
	        // activity.actionBar.title = "Event Kota";
	        activity.actionBar.displayHomeAsUp = true; 
	        activity.actionBar.onHomeIconItemSelected = function() {
	            winDetail.close();
	        };
	    }
	});
});*/