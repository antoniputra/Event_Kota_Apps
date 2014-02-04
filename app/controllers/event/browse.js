var args = arguments[0] || {};

renderBrowse(args);

function renderBrowse(datas)
{
	Ti.API.info('Method RenderBrowse : ' + datas);
	Ti.API.info('ndelok variable customFieldsnya : ' + datas.data.posts[0].custom_fields);
	Ti.API.info('ndelok variable Time : ' + datas.data.posts[0].custom_fields.st_time);

	var tableData = [];

	var items = datas.data.posts;
	
	Ti.API.info('ndelok variable limit : ' + Math.min(items.length,10));

	$.title.text = args.data.posts[0].title || 'jika kosong apinya';

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
            color:'#101010',
            font:{fontFamily:'Arial', fontWeight:'bold'},
            text:post.title_plain,
            objName: '?id='+ post.id + '&post_type=event',
            left:70, top: 2,
            width:Ti.UI.FILL, height: 50
        });
        row.add(post_title);

        post_title.addEventListener('click', function(e) {
            // alert( 'source objName : ' + e.source.objName + ' -- source : ' + e.source );

            // Check console
            Ti.API.info('User clicked the title ');

            var param = e.source.objName;

            showBook2(param);
        });

        var post_time = Ti.UI.createLabel({
            color:'#2f2f2f',
            font:{fontFamily:'Arial', fontWeight:'normal'},
            text:post.custom_fields.st_date + ' ' + st_time + ' -- ' + post.custom_fields.end_date + ' ' + end_time,
            left:70, top:40,
            width:Ti.UI.FILL
        });
        row.add(post_time);
        	
        tableData.push(row);
    }

    $.table.data = tableData;
}