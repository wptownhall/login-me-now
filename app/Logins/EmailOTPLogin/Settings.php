<?php
/**
 * @author  Pluginly
 * @since   1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Logins\EmailOTPLogin;

class Settings {
	public function __construct() {
		add_filter( 'login_me_now_admin_settings_datatypes', [$this, 'register_types'] );
		add_filter( 'login_me_now_dashboard_rest_options', [$this, 'register_options'] );
	}

	public function register_types( array $options ) {
		$options['email_otp']         = 'bool';
		$options['email_otp_length']  = 'int';
		$options['email_otp_expires'] = 'int';
		$options['email_otp_expires'] = 'int';

		return $options;
	}

	public function register_options( array $options ) {
		$options['email_otp'] = false;

		return $options;
	}
}