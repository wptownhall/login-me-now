document.addEventListener("DOMContentLoaded", () => {
	
	var lmnFbLoginBtn = document.querySelector('.lmn-facebook-login-button');
	lmnFbLoginBtn.addEventListener('click', function(e){
		FB.login(function(response) {
  			console.log(response);
		}, {scope: 'public_profile,email'});
	});

	// Configure the API
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '216231107876248',
			cookie     : true,
			xfbml      : true,
			version    : 'v18.0'
		});

		lmnFbLoginBtn.disabled = false;

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				loginToSite(response);  
			} else {
				console.log(response);
			}
		});
	};

	// Profile Data Fetch
	function loginToSite(response) {
		if (response.status !== "connected") {
			console.log('not connected');
			return;
		}
		FB.api('/me?fields=id,name,first_name,last_name,email,picture.type(large)', function(userData) {
			// console.log(userData);

			var data = {
				id: userData.id,
				fullName: userData.name,
				firstName: userData.first_name,
				lastName: userData.last_name,
				email: userData.email,
				profilePicture: userData.picture.data.url
			};

			
		});
	}
});