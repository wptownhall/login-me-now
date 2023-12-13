<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Abstracts\ModuleBase;
use LoginMeNow\FacebookLogin\Authenticate;
use LoginMeNow\FacebookLogin\Enqueuer;
use LoginMeNow\Model\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class FacebookLogin extends ModuleBase {

	public function setup(): void {

		$enable     = Settings::init()->get( 'facebook_login', false );
		$app_id     = Settings::init()->get( 'facebook_login_app_id', '' );
		$app_secret = Settings::init()->get( 'facebook_login_app_secret', '' );

		// if ( ! $enable || ! $app_id || ! $app_secret ) {
		// 	return;
		// }

		( new Enqueuer() );
		( new Ajax() );
		( new Authenticate() );
		( new Button() );
		( new Profile() );
	}
}