<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.2.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Model\BrowserToken;
use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\Random;

/**
 * Database related methods and actions
 */
class AfterActivation {
	use Singleton;

	public function __construct() {
		register_activation_hook( LOGIN_ME_NOW_PATH . '/login-me-now.php', [$this, 'update'] );
	}

	public function update(): void {
		BrowserToken::init()->create_table();

		/**
		 * Add the secret key if not exist
		 */
		$key = get_option( 'login_me_now_secret_key' );
		if ( ! $key ) {
			$key = Random::key();
			update_option( 'login_me_now_secret_key', $key );
		}

		/**
		 * Add the algorithm if not exist
		 */
		$algo = get_option( 'login_me_now_algorithm' );
		if ( ! $algo ) {
			$algo = 'HS256';
			update_option( 'login_me_now_algorithm', $algo );
		}
	}
}