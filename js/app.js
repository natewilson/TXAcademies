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
}


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

});
//*/
