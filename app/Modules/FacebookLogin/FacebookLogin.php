<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Abstracts\ModuleBase;
use LoginMeNow\FacebookLogin\Enqueuer;
use LoginMeNow\Model\Settings;

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
		$enable = Settings::init()->get( 'facebook_login', false );
		$app_id = Settings::init()->get( 'facebook_app_id', '' );

		if ( $enable && $app_id ) {
			return true;
		}

		return false;
	}
}