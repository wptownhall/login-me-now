<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.1.0
 */

namespace LoginMeNow\GoogleLogin;

use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class OneTap {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->filter( 'login_me_now_google_login_show_onetap', 'onetap' );
	}

	public function onetap() {
		if ( ! $this->show() ) {
			return false;
		}

		if ( is_user_logged_in() ) {
			return false;
		}

		return true;
	}

	private function show(): bool {
		$show_on = Settings::init()->get( 'google_onetap_display_location', 'side_wide' );

		switch ( $show_on ) {
			case 'side_wide':
			case 'selected_pages':
				return true;
				break;

			case 'login_screen':
				return is_login();
				break;
		}

		return false;
	}
}