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
		// if ( ! self::show() ) {
		// 	return;
		// }

		Button::init();
		( new Route() );
	}

	public static function show(): bool {
		$enable = SettingsRepository::get( 'email_otp_login', false );

		if ( $enable ) {
			return true;
		}

		return false;
	}
}