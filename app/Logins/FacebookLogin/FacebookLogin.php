<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.6.0
 */

namespace LoginMeNow\Logins\FacebookLogin;

use LoginMeNow\Abstracts\ModuleBase;
use LoginMeNow\Logins\FacebookLogin\Enqueuer;
use LoginMeNow\Repositories\SettingsRepository;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class FacebookLogin extends ModuleBase {

	public function setup(): void {
		if ( ! self::show() ) {
			return;
		}

		( new Enqueuer() );
		( new Ajax() );
		( new Button() );
	}

	public static function show(): bool {
		$enable = SettingsRepository::get( 'facebook_login', false );
		$app_id = SettingsRepository::get( 'facebook_app_id', '' );

		if ( $enable && $app_id ) {
			return true;
		}

		return false;
	}
}