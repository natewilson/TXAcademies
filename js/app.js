/*
var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}
//*/
//document.addEventListener('DOMContentLoaded', scroll, false);


// Remove the Splash Screen
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	navigator.splashscreen.hide();
}


/** Load this stuff up when the document loads **/
$(document).ready(function(){

	// Add the click behaviour to the nav bar
	$('#nav-bar a').on('click', function(e){
	    e.preventDefault();
	    var nextPage = $(this).attr("href");
	    $("#pages .page").hide();
	    $(nextPage).show();
	});

	// Show the home page
	$("#pages .page").hide();
	$("#page-home").show();

});
//*/
