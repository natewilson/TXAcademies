var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}
document.addEventListener('DOMContentLoaded', scroll, false);

$(document).ready(function(){
	$('#nav-bar a').on('click', function(e){
	    e.preventDefault();
	    var nextPage = $(e.target.hash);
	    $("#pages .current").removeClass("current");
	    nextPage.addClass("current");
	});
});
