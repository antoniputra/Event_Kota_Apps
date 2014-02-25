var args = arguments[0] || {},
	viewBrowse 	= $.browseViewWrapper,
	moment 		= require('alloy/moment');

var loading = Alloy.Globals.showLoading('Retrieving Events...');
viewBrowse.add(loading);
loading.show();

Alloy.Globals.serviceApi.getEventByDate({
	apikey: args.apiKey
}, function(results) {
	
	// hide loading
	viewBrowse.remove(loading);

	renderBrowse(results);
});

function renderBrowse(params)
{
	$.labelInfo.text = args.infoData;

	var items = params.data.posts;
	var tableData = [];

	//Ti.API.debug('===== Debug API-KEY : ' + args.apiKey + ' | Length Post : ' + items.length );

	if(params.data.count_total > 0)
	{
		for (var i = 0; i < Math.min(items.length,10); i++) 
	    {
	        var post = items[i];

	        if(typeof post.custom_fields.st_date != 'undefined') {
	        	var moment_st_date 	= moment(post.custom_fields.st_date[0], "YYYY-MM-DD");
	        	var st_date 		= moment_st_date.format("dddd, DD MMM");
	        }

	        if(typeof post.custom_fields.end_date != 'undefined') {
	        	var moment_end_date = moment(post.custom_fields.end_date[0], "YYYY-MM-DD");
	        	var end_date 		= moment_end_date.format("dddd, DD MMM");		
	        }

	        var st_time     = ( typeof post.custom_fields.st_time != 'undefined') ? post.custom_fields.st_time[0] : '' ;
	        var end_time    = ( typeof post.custom_fields.end_time != 'undefined') ? post.custom_fields.end_time[0] : '' ;

	        var paramArgs = {
	        	number: i,
		        image: ( typeof(post.thumbnail_images) != 'undefined' && post.thumbnail_images !== null ) ? post.thumbnail_images.tevolution_thumbnail.url : '',
		        start_at: st_date +' '+ st_time,
		        finish_at: end_date +' '+ end_time,
		        apiDetail: 'get_post/?id='+ post.id +'&post_type=event',
		        title: post.title_plain,
		        address: (typeof post.custom_fields.address != 'undefined') ? post.custom_fields.address[0] : ''
		    };
		    var row = Alloy.createController('event/browseRow', paramArgs).getView();
	        tableData.push(row);
	    }

	    $.tableBrowse.data = tableData;

	    var conDetail 	= Alloy.createController('event/detail'),
		    winDetail	= conDetail.getView();

	    $.tableBrowse.addEventListener("click", function(e) 
	    {
		    if(e.source.children[0].apiDetail)
		    {
			    conDetail.setDetailEvent(e.source.children[0].apiDetail);

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
			}
	    });

	} else {

		var row = Ti.UI.createTableViewRow();

    	var title = Ti.UI.createLabel({
            color:'#fdfdfd',
            font:{fontFamily:'Arial', fontWeight:'bold'},
            text:'No Events happening'
        });
        row.add(title);

        tableData.push(row);

		$.tableBrowse.data = tableData;
	}
}

/*function renderBrowseMenu()
{
	Ti.API.debug('Ini adalah method renderBrowseMenu');

	var browseMenu = Alloy.createController('event/browseMenu', { 
	    id: "browseMenuID", 
	    objName: args.apiKey || 'jancok metuo cook'
	}).getView();
	viewBrowse.add( browseMenu );
}*/