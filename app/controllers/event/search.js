var args = arguments[0] || {};

var forms = require('helper');
var fields = [
	{ title:'Event Name', type:'text', id:'name' },
	{ title:'City', type:'picker', id:'city', data: helper.staticCityData },
	{ title:'Date', type:'date', id:'date' },
	{ title:'Search', type:'submit', id:'fireSearch' }
];

var win = Ti.UI.createWindow({fullscreen:false});
var form = forms.createForm({
	style: forms.STYLE_LABEL,
	fields: fields
});

win.add(form);
win.open();

form.addEventListener('fireSearch', function(e) {
	searchResult(e.values);
});


win.addEventListener('open', function(e) {
    var activity = win.activity;
 
    if( Alloy.Globals.Android.Api >= 11 ) {
        activity.actionBar.title = "Search Event";
        activity.actionBar.displayHomeAsUp = true; 
        activity.actionBar.onHomeIconItemSelected = function() {
            win.close();
        };
    }
});

function searchResult(datas)
{
	Ti.API.debug( 'Lihat Hasil Form ' + JSON.stringify(datas) );
	
	/*var targetDate 	= datas.date.toString("YYYY-MM-DD");
    targetDate.substring(0,10);*/
    var dd = datas.date.getDate();
    var mm = datas.date.getMonth() + 1;
    if(dd < 10) { dd ='0'+dd; }
    if(mm < 10) { mm ='0'+mm; }
    var targetDate 	= datas.date.getFullYear() +'-'+ mm +'-'+ dd,
    	displayDate	= dd +'-'+ mm +'-'+ datas.date.getFullYear();
   	
   	Ti.API.info(targetDate);

	var winResult = Ti.UI.createWindow({fullscreen:false});

	var searchInfo 	= 'Title: '+ datas.name +', City: '+ datas.city +', date: '+ displayDate;
	var apiCity 	= datas.city == 'All Cities' ? '' : datas.city;
	winResult.add(Alloy.createController("event/browse", {
		apiKey: 'get_event_dates/?date='+ targetDate +'&etype=null&title='+ datas.name +'&city='+ apiCity,
		infoData: searchInfo
	}).getView());
	winResult.open();
}