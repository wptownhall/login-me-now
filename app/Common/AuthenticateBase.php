<?php
/**
 * @author  WPtownhall
 * @since   1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Common;

use LoginMeNow\Common\Hookable;
use LoginMeNow\Common\Singleton;
use LoginMeNow\DTO\LoginDTO;
use LoginMeNow\Repositories\AccountRepository;

abstract class AuthenticateBase {
	use Singleton;
	use Hookable;

	public array $user_data;
	public string $channel;
	public bool $redirect_return = false;

	public function __construct( array $user_data ) {
		$this->user_data = wp_parse_args( $user_data, [
			'email' => '',
			'name'  => '',
		] );
	}

	public function authenticate() {
		$wp_user      = get_user_by( 'email', sanitize_email( $this->user_data['email'] ) );
		$redirect_uri = ! empty( $_POST['redirect_uri'] ) ? esc_url_raw( wp_unslash( $_POST['redirect_uri'] ) ) : admin_url();
		$redirect_uri = apply_filters( "login_me_now_{$this->channel}_login_redirect_url", $redirect_uri );

		if ( $wp_user ) {
			$dto = ( new LoginDTO )
				->set_user_id( $wp_user->ID )
				->set_redirect_uri( $redirect_uri )
				->set_redirect_return( false )
				->set_channel_name( $this->channel );

			$action = ( new AccountRepository )->login( $dto );

		} else {
			$action = ( new AccountRepository )->register( $redirect_uri );
		}

		if ( is_wp_error( $action ) ) {
			error_log( 'Login Me Now - ' . print_r( $action ) );

			return ['error message goes here'];
		}

		return $redirect_uri;
	}
}