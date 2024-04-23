<?php
/**
 * @author  WPtownhall
 * @since   1.5.0
 * @version 1.5.0
 */

namespace LoginMeNow;

use LoginMeNow\Abstracts\EnqueuerBase;
use LoginMeNow\Model\Settings;

class Enqueuer extends EnqueuerBase {

	public function wp_enqueue_scripts(): void {
		$this->register_script( 'login-me-now-google-api', '//apis.google.com/js/api:client.js' );
		$this->register_script( 'login-me-now-social-login-main', LOGIN_ME_NOW_PUBLIC . 'js/main.js', ['login-me-now-google-api'] );

		$this->register_style( 'login-me-now-social-login-main', LOGIN_ME_NOW_PUBLIC . 'css/main.css' );
		$this->local_script();
	}

	public function login_enqueue_scripts(): void {
		$this->register_script( 'login-me-now-google-api', '//apis.google.com/js/api:client.js' );
		$this->register_script( 'login-me-now-social-login-main', LOGIN_ME_NOW_PUBLIC . 'js/main.js', ['login-me-now-google-api'] );

		$this->register_style( 'login-me-now-social-login-main', LOGIN_ME_NOW_PUBLIC . 'css/main.css' );
		$this->local_script();
	}

	public function local_script() {
		$data = [
			'ajax_url'                  => admin_url( 'admin-ajax.php' ),
			'facebook_app_id'           => Settings::init()->get( 'facebook_app_id', '' ),
			'facebook_pro_redirect_url' => Settings::init()->get( 'facebook_pro_redirect_url', '' ),
			'google_client_id'          => Settings::init()->get( 'google_client_id', '' ),
			'google_pro_redirect_url'   => Settings::init()->get( 'google_pro_redirect_url', '' ),
		];

		wp_localize_script( 'login-me-now-social-login-main', 'login_me_now_social_login_main_obj', $data );
	}
}