<?php
/**
 * @author  WPtownhall
 * @since  	1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Repositories;

use LoginMeNow\DTO\LoginDTO;
use LoginMeNow\DTO\UserDataDTO;
use LoginMeNow\Utils\User;
use WP_Error;

class AccountRepository {

	public array $user_data;
	public string $channel;
	public string $redirect_uri;

	public function login( LoginDTO $dto ) {
		include ABSPATH . "wp-includes/pluggable.php";

		do_action( "login_me_now_before_login", $dto );

		$user_id            = $dto->get_user_id();
		$this->redirect_uri = $dto->get_redirect_uri();
		$redirect_return    = $dto->is_redirect_return();

		if ( is_user_logged_in() ) {
			$current_user_id = get_current_user_id();
			if ( $user_id !== $current_user_id ) {
				wp_logout();
			}
		}

		error_log( print_r( $this->redirect_uri ,true) );
		$user = get_user_by( 'id', $user_id );

		wp_clear_auth_cookie();
		wp_set_current_user( $user_id, $user->user_login );
		wp_set_auth_cookie( $user_id, true );

		do_action( "login_me_now_after_login", $user_id, $dto );

		error_log( print_r( $this->redirect_uri, true ) );

		$this->handlePopupRedirectAfterAuthentication();

		if ( $redirect_return ) {
			return $this->redirect_uri;
		}

		if ( wp_safe_redirect( $this->redirect_uri ) ) {
			exit;
		}
	}

	public function register( UserDataDTO $userDataDTO ) {
		$errors = new WP_Error();

		$username = $this->unique_username( $userDataDTO );

		do_action( "login_me_now_before_registration", $username, $userDataDTO );

		$user_id = register_new_user(
			sanitize_user( $username ),
			sanitize_email( $userDataDTO->get_user_email() )
		);

		if ( is_wp_error( $user_id ) ) {
			$errors->add(
				'registration_failed',
				__( '<strong>Error</strong>: Registration Failed', 'login-me-now' ),
				$user_id
			);
		}

		if ( $errors->has_errors() ) {
			return $errors;
		}

		do_action( "login_me_now_after_registration", $user_id, $userDataDTO );

		User::set_role( $user_id, $this->channel );
		User::update_profile( $user_id, $this->user_data, $this->channel );

		$dto = ( new LoginDTO )
			->set_user_id( $user_id )
			->set_redirect_uri( $userDataDTO->get_redirect_uri() )
			->set_redirect_return( false );

		( new AccountRepository )->login( $dto );
	}

	public function unique_username( UserDataDTO $userDataDTO ): string {
		$username_parts = [];

		if ( ! empty( $userDataDTO->get_name() ) ) {
			$name             = str_replace( ' ', '.', $userDataDTO->get_name() );
			$username_parts[] = sanitize_user( $name, true );
		}

		if ( empty( $username_parts ) ) {
			$email_parts      = explode( '@', $userDataDTO->get_user_email() );
			$email_username   = $email_parts[0];
			$username_parts[] = sanitize_user( $email_username, true );
		}

		$username = strtolower( implode( '.', $username_parts ) );

		$default_user_name = $username;
		$suffix            = 1;
		while ( username_exists( $username ) ) {
			$username = $default_user_name . $suffix;
			$suffix++;
		}

		return $username;
	}

	public function update_profile( int $user_id, UserDataDTO $UserDataDTO ): void {

		do_action( "login_me_now_before_profile_data_update", $user_id, $UserDataDTO );

		$user_data                 = [];
		$user_data['ID']           = $user_id;
		$user_data['first_name']   = $UserDataDTO->get_first_name();
		$user_data['last_name']    = $UserDataDTO->get_last_name();
		$user_data['display_name'] = $UserDataDTO->get_display_name();
		$user_data['picture']      = $UserDataDTO->get_user_avatar_url();

		$channel = $UserDataDTO->get_channel_name();
		wp_update_user( $user_data );
		update_user_meta( $user_id, 'nickname', $user_data['first_name'] );

		if ( isset( $user_data['picture'] ) && ! empty( $user_data['picture'] ) ) {
			update_user_meta(
				$user_id,
				"login_me_now_{$channel}_profile_picture_url",
				esc_url_raw( $user_data['picture']
				)
			);
		}

		do_action( "login_me_now_after_profile_data_update", $user_id, $UserDataDTO );
	}

	protected function handlePopupRedirectAfterAuthentication() {
		?>
            <!doctype html>
            <html lang=en>
            <head>
                <meta charset=utf-8>
                <title><?php _e( 'Authentication successful', 'login-me-now' );?></title>
                <script type="text/javascript">
                    try {
                        if (window.opener !== null && window.opener !== window) {
                            var sameOrigin = true;
                            try {
                                var currentOrigin = window.location.protocol + '//' + window.location.hostname;
                                if (window.opener.location.href.substring(0, currentOrigin.length) !== currentOrigin) {
                                    sameOrigin = false;
                                }

                            } catch (e) {
                                /**
                                 * Blocked cross origin
                                 */
                                sameOrigin = false;
                            }
                            if (sameOrigin) {
                                var url = <?php echo wp_json_encode( $this->redirect_uri ); ?>;
                                if (typeof window.opener.lmnRedirect === 'function') {
                                    window.opener.lmnRedirect(url);
                                } else {
                                    window.opener.location = url;
                                }
                                window.close();
                            } else {
                                window.location.reload(true);
                            }
                        } else {
                            if (window.opener === null) {
                                /**
                                 * Cross-Origin-Opener-Policy blocked the access to the opener
                                 */
                                if (typeof BroadcastChannel === "function") {
                                    const _lmnLoginBroadCastChannel = new BroadcastChannel('lmn_login_broadcast_channel');
                                    _lmnLoginBroadCastChannel.postMessage({
                                        action: 'redirect',
                                        href:<?php echo wp_json_encode( $this->redirect_uri ); ?>});
                                    _lmnLoginBroadCastChannel.close();
                                    window.close();
                                } else {
                                    window.location.reload(true);
                                }
                            } else {
                                window.location.reload(true);
                            }
                        }
                    } catch (e) {
                        window.location.reload(true);
                    }
                </script>
            </head>
            <body><a href="<?php echo esc_url( $this->redirect_uri ); ?>"><?php echo 'Continue...'; ?></a></body>
            </html>
        <?php exit;
	}
}