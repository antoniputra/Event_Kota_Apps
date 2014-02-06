var args = arguments[0] || {},
	viewBrowse = $.browseViewWrapper;

renderBrowseMenu();

renderBrowse();

function renderBrowse()
{
	Ti.API.debug('Debug API-KEY : ' + args.apiKey);

	var items = args.data.posts;
	var tableData = [];

	Ti.API.debug('===== Length Post : ' + items.length);

	if(args.data.count_total > 0)
	{
		for (var i = 0; i < Math.min(items.length,10); i++) 
	    {
	        var post = items[i];

	        var st_time     = (post.custom_fields.st_time) ? post.custom_fields.st_time : '' ;
	        var end_time    = (post.custom_fields.end_time) ? post.custom_fields.end_time : '' ;


	        var row = Ti.UI.createTableViewRow({
	            className:'forumEvent', // used to improve table performance
	            backgroundSelectedColor:'#b0b0b0',
	            rowIndex:i,
	            height:110
	        });
	        	
	        var post_thumb = Ti.UI.createImageView({
	            image: ( typeof(post.thumbnail_images) != "undefined" && post.thumbnail_images !== null ) ? post.thumbnail_images.tevolution_thumbnail.url : '',
	            left:10, top:5,
	            width:50, height:50
	        });
	        row.add(post_thumb);

	        var post_title = Ti.UI.createLabel({
	            color:'#fdfdfd',
	            font:{fontFamily:'Arial', fontWeight:'bold'},
	            text:post.title_plain,
	            objName: '?id='+ post.id + '&post_type=event',
	            left:70, top: 2,
	            width:Ti.UI.FILL, height: 50
	        });
	        row.add(post_title);

	        post_title.addEventListener('click', function(e) {
	            Ti.API.info('User clicked the title ');

	            var param = e.source.objName;

	            alert('Detail Event ID : ' + param);
	        });

	        var post_time = Ti.UI.createLabel({
	            color:'#f0f0f0',
	            font:{fontFamily:'Arial', fontWeight:'normal'},
	            text:post.custom_fields.st_date + ' ' + st_time + ' -- ' + post.custom_fields.end_date + ' ' + end_time,
	            left:70, top:40,
	            width:Ti.UI.FILL
	        });
	        row.add(post_time);
	        	
	        tableData.push(row);
	    }

	    $.tableBrowse.data = tableData;
	} else {
		
		var row = Ti.UI.createTableViewRow({
            className:'forumEvent',
            backgroundSelectedColor:'#b0b0b0',
            height:110
        });

    	var post_title = Ti.UI.createLabel({
            color:'#fdfdfd',
            font:{fontFamily:'Arial', fontWeight:'bold'},
            text:'Today no events happening',
            width:Ti.UI.FILL, 
            height: 50
        });
        row.add(post_title);

        tableData.push(row);

		$.tableBrowse.data = tableData;
	}
}

function renderBrowseMenu()
{
	Ti.API.debug('Ini adalah method renderBrowseMenu');

	var browseMenu = Alloy.createController('event/browseMenu', { 
	    id: "browseMenuID", 
	    objName: args.apiKey || 'jancok metuo cook'
	}).getView();
	viewBrowse.add( browseMenu );
}