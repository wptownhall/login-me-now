<?php
/**
 * @author  Pluginly
 * @since  	1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Logins\EmailOTPLogin;

use LoginMeNow\DTO\LoginDTO;
use LoginMeNow\Repositories\AccountRepository;
use LoginMeNow\Utils\Transient;

class Repository {

	private int $user_id = 0;
	private int $expires;

	public function __construct( int $user_id = 0 ) {
		$this->user_id = $user_id;
	}

	public function auth() {
		$redirect_uri = $this->redirect_uri();
		$loginDTO     = ( new LoginDTO )
			->set_user_id( $this->user_id )
			->set_redirect_uri( $redirect_uri )
			->set_redirect_return( true )
			->set_channel_name( 'email_otp' );

		$action = ( new AccountRepository )->login( $loginDTO );

		if ( is_wp_error( $action ) ) {
			throw new \Exception( print_r( $action, true ) );
		}

		return $redirect_uri;
	}

	private function redirect_uri() {
		$redirect_uri = ! empty( $_POST['redirect_uri'] ) ? esc_url_raw( wp_unslash( $_POST['redirect_uri'] ) ) : admin_url();

		return apply_filters( "login_me_now_email_otp_login_redirect_url", $redirect_uri );
	}

	public function send_otp() {
		$this->expires = 300;

		$max_per_day = Transient::get( "email_otp_{$this->user_id}_max_per_day" );
		// if ( $max_per_day && $max_per_day >= 5 ) {
		// 	throw new \Exception( __( "Daily limit reached", 'login-me-now' ) );
		// }

		$site_title = get_bloginfo( 'name' ) ?? site_url();
		$email      = get_userdata( $this->user_id )->user_email;
		$code       = ( new OTP( $this->user_id ) )->generate();

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

		if ( ! $bool ) {
			throw new \Exception( __( "Email wasn't sent", 'login-me-now' ) );
		}

		return __( 'OTP sent successfully', 'login-me-now' );
	}

	public function verify_otp( string $code ) {
		try {
			$otp = new OTP( $this->user_id );
			if ( ! $otp->verify( $code ) ) {
				throw new \Exception( __( "Invalid OTP", 'login-me-now' ) );
			}

			$otp->flush();
			$this->auth();

			return __( 'OTP verified successfully', 'login-me-now' );

		} catch ( \Throwable $th ) {
			throw $th;
		}
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