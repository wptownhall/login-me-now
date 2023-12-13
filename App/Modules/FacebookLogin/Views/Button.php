<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

$appId  = '1066164867842887';
?>

<div class="lmn_fb_login">
    <button class="lmn_fb_login_button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1365.3 1365.3" height="20" width="20">
            <path d="M1365.3 682.7A682.7 682.7 0 10576 1357V880H402.7V682.7H576V532.3c0-171.1 102-265.6 257.9-265.6 74.6 0 152.8 13.3 152.8 13.3v168h-86.1c-84.8 0-111.3 52.6-111.3 106.6v128h189.4L948.4 880h-159v477a682.8 682.8 0 00576-674.3" fill="#fff"></path>
        </svg>
        <span><?php esc_html_e( 'Continue with Facebook', 'login-me-now' );?></span>
    </button>

    <style>
        .lmn_fb_login .lmn_fb_login_button {
            border: 0px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 10px 15px;
            background-color: #1877F2;
            color: #fff;
            cursor: pointer;
        }

        .lmn_fb_login .lmn_fb_login_button span {
            margin-left: 8px;
            font-size: 14px;
        }
    </style>

    <script>
        // Challenge
        // If has token and app id is valid then run code
        // If not then show error message console
        // When someone clicks the button, just login to the app
        // After clicking and successful login send the access Token of users to the backend to verify it again
        // After getting a good response, redirect to wp-admin page.
        //

	    document.addEventListener('DOMContentLoaded', function () {

			if (typeof LoginMeNowFacebookLogin === 'undefined') {
				var LoginMeNowFacebookLogin  = {

					init: function() {
						var self = this;
						var loginButtons = document.querySelectorAll('.lmn_fb_login_button');

						window.fbAsyncInit = function() {
							FB.init({
								appId: <?php echo esc_attr( $appId ); ?>,
								status: false,
								cookie: true,
								xfbml: true,
								version: "v4.0"
							});
						}

						loginButtons.forEach(button => {
							button.addEventListener('click', function (event) {
								console.log(button)
								event.preventDefault();
								self.tryLogin();
							});
						});
					},

					tryLogin: function () {
						if (typeof FB === "undefined") {
							console.log("Facebook Login: API is not loaded yet");
							return;
						}

						var self = this;
						FB.login(
							function (response) {
								console.log(response);
								if( response.authResponse.accessToken ) {
									self.sendRequest(response.authResponse.accessToken);
								} else {
									console.log("Login Failed, something wen't wrong.");
								}
							}
						);
					},

					sendRequest: function (accessToken) {
						console.log( 'Access Token: ', accessToken );
						fetch('<?php echo admin_url( 'admin-ajax.php' ); ?>', {
							method: 'POST',
							body: new URLSearchParams({
								action: 'login_me_now_facebook_login',
								security: '<?php echo wp_create_nonce( 'login_me_now_facebook_login_nonce' ); ?>',
								accessToken: accessToken,
							}),
						})
						.then(response => {
							if (!response.ok) {
								throw new Error('Network response was not ok');
							}
							return response.json();
						})
						.then(data => {
							console.log(data.data)
						})
					}
				};

				LoginMeNowFacebookLogin.init();
			}
		});
    </script>
</div>