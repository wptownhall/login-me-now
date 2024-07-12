<?php
/**
 * @author  Pluginly
 * @since  	1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Logins\EmailOTPLogin;

use LoginMeNow\DTO\LoginDTO;
use LoginMeNow\DTO\UserDataDTO;
use LoginMeNow\Repositories\AccountRepository;
use LoginMeNow\Utils\Transient;

class Repository {

	private int $user_id;
	private int $expires;

	public function auth( UserDataDTO $userDataDTO ) {
		$wp_user      = get_user_by( 'email', sanitize_email( $userDataDTO->get_user_email() ) );
		$redirect_uri = $this->redirect_uri();

		$userDataDTO->set_redirect_uri( $redirect_uri );
		$userDataDTO->set_channel_name( 'email_otp' );

		if ( $wp_user ) {
			$loginDTO = ( new LoginDTO )
				->set_user_id( $wp_user->ID )
				->set_redirect_uri( $redirect_uri )
				->set_redirect_return( false )
				->set_channel_name( 'google' );

			$action = ( new AccountRepository )->login( $loginDTO, $userDataDTO );

		} else {
			$action = ( new AccountRepository )->register( $userDataDTO );
		}

		if ( is_wp_error( $action ) ) {
			error_log( 'Login Me Now - ' . print_r( $action ) );

			return ['error message goes here'];
		}

		return $redirect_uri;
	}

	private function redirect_uri() {
		$redirect_uri = ! empty( $_POST['redirect_uri'] ) ? esc_url_raw( wp_unslash( $_POST['redirect_uri'] ) ) : admin_url();

		return apply_filters( "login_me_now_email_otp_login_redirect_url", $redirect_uri );
	}

	public function send_otp( int $user_id ): array {
		$this->user_id = $user_id;
		$this->expires = 300;

		$max_per_day = Transient::get( "email_otp_{$this->user_id}_max_per_day" );
		if ( $max_per_day && $max_per_day >= 5 ) {
			return ['daily limit reached'];
		}

		$site_title = get_bloginfo( 'name' ) ?? site_url();
		$email      = get_userdata( $this->user_id )->user_email;
		$code       = ( new OTP( $user_id ) )->generate();

		$template = $this->prepare_template( [
			'otp_code'   => $code,
			'site_title' => $site_title,
			'expire_in'  => $this->expires,
		] );

		$bool = wp_mail(
			$email,
			'Login Me Now - OTP',
			$template
		);

		return [
			$template,
			$code,
			$bool,
		];
	}

	public function verify_otp( int $user_id, string $code ): array {
		$this->user_id = $user_id;

		$code = ( new OTP( $user_id ) )->verify( $code );

		return [
			$code,
		];
	}

	public function prepare_template( $args ) {
		$top_title     = sprintf( esc_html__( 'To verify your account is safe, please use the following code to enable your new device — it will expire in %s:', 'login-me-now' ), $args['expire_in'] );
		$otp_code      = $args['otp_code'];
		$footer_title  = esc_html__( 'If you did not request this code, please contact our support team immediately.', 'login-me-now' );
		$footer_bottom = sprintf( esc_html__( 'Thank you, %s', 'login-me-now' ), $args['site_title'] );

		ob_start();
		include __DIR__ . '/views/EmailTemplate.php';

		return ob_get_clean();
	}
}