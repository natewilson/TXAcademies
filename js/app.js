// Safe logging...
function slog(str) {
	var inPage = null;
	if (console && console.log && typeof console.log == "function")
		console.log(str);
	if (inPage = document.getElementById("slog"))
		inPage.innerHTML = str + "<br/>" + inPage.innerHTML;
}

// Assign an anonymous function to load after the document that
// checks for the availability of in-page logging.
document.addEventListener("DOMContentLoaded",function() {
	if (!(inPage = document.getElementById("slog"))) {
		slog("No In-Page sLog element found. Add <div id='slog'></div> to activate.");
	} else {
		slog("In-Page logging active.");
	}
}, false);

function slogJSON(json) {
	slog(JSON.stringify(json));
}

// Used for things that run after BOTH deviceReady and DOMContentLoaded events fire
var DOMContentLoaded = false;

/*
function getLoginStatus() {
	FB.getLoginStatus(function(response) {
		slog("JSON FB.getLoginStatus: " + JSON.stringify(response));
		if (response.status == 'connected') {
			slog('logged in');
		} else {
			slog('not logged in - showing FB.login');
			FB.login(function(response) {
				slog("JSON FB.login: " + JSON.stringify(response));
				if (response.authResponse) {
					slog("FB.login indicates success");	// connected
				} else {
					slog("FB.login indicates cancelled");	// cancelled
				}
			},{scope: "email"});
		}
	});
} //*/


/*
function greetUser() {
	getLoginStatus();
	FB.api("me/",{fields:'id,last_name'},function(response){
		slog("JSON FB.api: " + JSON.stringify(response));
		if (response.last_name) {
			document.getElementById("data").innerHTML = "Welcome Brother " + response.last_name;
		} else {
			slog("No last name retrieved from FB.  Error: " + JSON.stringify(response.error));
		}
	});
} //*/


// Will run initialize after both deviceReady and DOMContentLoaded
function onDeviceReady() {
	if (!DOMContentLoaded)
		document.addEventListener("DOMContentLoaded", initialize, false);
	else 
		initialize();
}


function evaluateFBSession() {
	slog("Something Changed in your FB Session!");
}

function logoutFB() {
	slog("FB logout detected.  Switching to Connect stage");
	$('img#fb-connect-img').click(FB.login);
	$('div.stage').hide();
	$('div.stage#fb-connect').show();
}


// function to call when Cordova/PhoneGap native code is loaded AND Document is ready.
function initialize() {

	slog("Entering onDeviceReady()");

	// First show the loading stage
	$('div.stage').hide();
	$('div.stage#loading').show();

	// Remove the Splash Screen
	try {
		navigator.splashscreen.hide();
	} catch (e) {
		slog("Error hiding splashscreen - are you running in a browser?");
	}

	// Attempt connection to Facebook:
	try {
		slog("Trying to initialize FB.");
		FB.init({ appId: "335426296568734", nativeInterface: CDV.FB, useCachedDialogs: false });

		slog("Subscribing to FB sessionChange event");
		FB.Event.subscribe('auth.sessionChange event',evaluateFBSession);

		// Need to setup the connect operation for later just in case we need it.
		$('img#fb-connect-img').click(function(){FB.login(slogJSON,{scope:"email"});});

		FB.getLoginStatus(function(response){
					slog("FB.getLoginStatus: "+JSON.stringify(response));
					if (response.authResponse) {
						// Show the welcome stage?? or share stage??
					} else {
						$("div.stage").hide();
						$("div.stage#fb-connect").show();
					}
				},
				{scope:"email"}
		);
	} catch (e) {
		slog("FB threw exception: " + JSON.stringify(e));
	}

}

// Register anonymous function to indicate that DOM is loaded
slog("Adding event listener for anonymous function to assign DOMContentLoaded");
document.addEventListener("DOMContentLoaded",function(){DOMContentLoaded=true;},false);

// Register the deviceReady (native code dependent) function.
slog("Adding event listener for deviceReady");
document.addEventListener("deviceready", onDeviceReady, false);

// TODO: REMOVE ME!!!!
// this simulates deviceReady
// onDeviceReady();


/*
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

});
//*/
