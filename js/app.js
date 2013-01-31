var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}
//document.addEventListener('DOMContentLoaded', scroll, false);


/** Load this stuff up when the document loads **/
$(document).ready(function(){
	$('#nav-bar a').on('click', function(e){
	    e.preventDefault();
	    var nextPage = $(this).attr("href");
	    $("#pages .page").hide();
	    $(nextPage).show();
	});
	$("#pages .page").hide();
	$("#page-home").show();
});
//*/
