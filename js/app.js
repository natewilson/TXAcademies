/*  REMOVED TEMPORARILY
var theScroll;
function scroll(){
	theScroll = new iScroll('wrapper');
}
//*/
//document.addEventListener('DOMContentLoaded', scroll, false);

// Safe logging...
function slog(str) {
	var inPage = null;
	if (console && console.log && typeof console.log == "function")
		console.log(str);
	if (inPage = document.getElementById("slog"))
		inPage.innerHTML = str + "<br/>" + inPage.innerHTML;
}


function getLoginStatus() {
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			slog('logged in');
		} else {
			slog('not logged in - showing FB.login');
			FB.login();
		}
	});
}


function greetUser() {
	getLoginStatus();
	FB.api("me/",{fields:'id,last_name'},function(response){
		if (response.last_name) {
			document.getElementById("data").innerHTML = "Welcome Brother " + response.last_name;
		} else {
			slog("No last name retrieved from FB.  Error: " + JSON.stringify(response.error));
		}
	});
}


// function to call when Cordova/PhoneGap native code is loaded.
function onDeviceReady() {

	// Remove the Splash Screen
	navigator.splashscreen.hide();

	// Attempt connection to Facebook:
	try {
		FB.init({ appId: "335426296568734", nativeInterface: CDV.FB, useCachedDialogs: false });
	} catch (e) {
		slog("Facebook init issue: " + JSON.stringify(e));
	}

}

// Register the deviceReady (native code dependent) function.
document.addEventListener("deviceready", onDeviceReady, false);



// Load this stuff up when the document loads.
// This may happen BEFORE the Phonegap library is loaded.
$(document).ready(function(){

	// Setup all external links (goto attr begining with "http") 
	// to use the Childbrowser plugin
	$('a[goto^="http"]').on('click', function() {
		window.plugins.childBrowser.showWebPage(
			$(this).attr("goto"),
			{ 
				showLocationBar:true,
				showAddress:true,
				showNavigationBar:true
			}
		);
		// Return from the a.onclick event false in order to
		// keep the link from following any HREF attribute.
		return false;
	});

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
