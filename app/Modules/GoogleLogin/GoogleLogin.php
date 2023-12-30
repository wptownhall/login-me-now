<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.1.0
 */

namespace LoginMeNow\GoogleLogin;

use LoginMeNow\Abstracts\ModuleBase;
use LoginMeNow\GoogleLogin\Authenticate;
use LoginMeNow\GoogleLogin\Enqueuer;
use LoginMeNow\Model\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GoogleLogin extends ModuleBase {

	public function setup(): void {

		$enable    = Settings::init()->get( 'google_login', false );
		$client_id = Settings::init()->get( 'google_client_id', '' );

		if ( ! $enable || ! $client_id ) {
			return;
		}

		Enqueuer::init();
		Authenticate::init();
		Button::init();
		Profile::init();

		if ( ! defined( 'LOGIN_ME_NOW_PRO_VERSION' ) ) {
			OneTap::init();
		}
	}
}