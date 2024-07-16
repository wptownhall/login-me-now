<?php
/**
 * @author  Pluginly
 * @since   1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Logins\EmailOTPLogin;

use LoginMeNow\Repositories\SettingsRepository;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class EmailOTPLogin extends \LoginMeNow\Common\ModuleBase {

	public function setup(): void {
		( new Settings() );

		// if ( ! self::show() ) {
		// 	return;
		// }

		Button::init();
		( new Route() );
	}

	public static function show(): bool {

		/**
		 * change the bool
		 */
		$enable = SettingsRepository::get( 'email_otp_login', true );

		if ( $enable ) {
			return true;
		}

		return false;
	}

	public static function show_on_native_login() {
		return self::show() && SettingsRepository::get( 'email_otp_native_login', true );
	}

	public static function create_auth_url() {
		return home_url( 'wp-login.php?lmn-email-otp-popup' );
	}
}