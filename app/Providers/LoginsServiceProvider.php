<?php
/**
 * @author  WPtownhall
 * @since   1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Providers;

use LoginMeNow\Common\LoginBase;
use LoginMeNow\Common\ProviderBase;
use LoginMeNow\Logins\BrowserTokenLogin\BrowserTokenLogin;
use LoginMeNow\Logins\FacebookLogin\FacebookLogin;
use LoginMeNow\Logins\GoogleLogin\GoogleLogin;
use LoginMeNow\Logins\LinkLogin\LinkLogin;

class LoginsServiceProvider extends ProviderBase {

	public function boot() {
		foreach ( $this->get_logins() as $_login ) {
			$login = new $_login();
			if ( $login instanceof LoginBase ) {
				$login->setup();
			}
		}

		include_once LOGIN_ME_NOW_LOGINS . '/UserSwitchingLogin/UserSwitchingLogin.php';
	}

	public function get_logins(): array {
		return [
			BrowserTokenLogin::class,
			FacebookLogin::class,
			GoogleLogin::class,
			LinkLogin::class,
		];
	}
}