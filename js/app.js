var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}
//document.addEventListener('DOMContentLoaded', scroll, false);

/**
 * Function that fetches tweets and drops them into the #tweets 
 * block using the tmpl-tweets template.
 */
function getTweets() {
    var q = "txrsa"
        rpp = 18,
        twurl = "http://search.twitter.com/search.json?q=";
    $.getJSON(twurl + q + "&rpp=" + rpp + "&callback=?", function(data){
        $("#tmpl-tweets").tmpl(data.results).appendTo("#tweets");
    });
}

/** Load this stuff up when the document loads **/
$(document).ready(function(){
	$('#nav-bar a').on('click', function(e){
	    e.preventDefault();
	    var nextPage = $(e.target.hash);
	    $("#pages .current").removeClass("current");
	    nextPage.addClass("current");
	});
	getTweets();
});
