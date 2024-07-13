<?php
/**
 * @author  Pluginly
 * @since  	1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Logins\EmailOTPLogin;

use LoginMeNow\Utils\Transient;

class OTP {

	private int $user_id;
	private string $code;
	private int $expires;

	public function __construct( int $user_id ) {
		$this->user_id = $user_id;
		$this->expires = 300;
	}

	public function generate(): string {
		$length = 6;

		$code = \LoginMeNow\Utils\Random::key( $length );

		Transient::set( "email_otp_{$this->user_id}", $code, $this->expires );
		Transient::set( "email_otp_{$this->user_id}_attempts", 0, $this->expires );

		$max_per_day = Transient::get( "email_otp_{$this->user_id}_max_per_day" );
		if ( $max_per_day ) {
			Transient::set( "email_otp_{$this->user_id}_max_per_day", $max_per_day + 1 );
		} else {
			Transient::set( "email_otp_{$this->user_id}_max_per_day", 1 );
		}

		return $code;
	}

	public function verify( string $code ): bool {
		$_code    = Transient::get( "email_otp_{$this->user_id}" );
		$attempts = Transient::get( "email_otp_{$this->user_id}_attempts" );

		if ( $attempts >= 5 ) {
			throw new \Exception( __( 'Maximum attempts reached. Please try again later.', 'login-me-now' ) );
		}

		Transient::set( "email_otp_{$this->user_id}_attempts", $attempts + 1 );

		return $code === $_code;
	}

	public function flush() {
		Transient::delete( "email_otp_{$this->user_id}" );
		Transient::delete( "email_otp_{$this->user_id}_attempts" );
	}
}