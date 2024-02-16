<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\LoginForm;

use LoginMeNow\FacebookLogin\Button as FacebookButton;
use LoginMeNow\FacebookLogin\FacebookLogin;
use LoginMeNow\GoogleLogin\Button as GoogleButton;
use LoginMeNow\GoogleLogin\GoogleLogin;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class LoginForm {
	use Hookable;
	use Singleton;

	public function __construct() {
		new Enqueuer();

		$this->action( 'login_form', 'login_buttons' );
		$this->action( 'register_form', 'login_buttons' );
		$this->filter( 'login_form_top', 'login_buttons_filter' );

		$this->action( 'woocommerce_login_form_start', 'login_buttons' );
	}

	public function login_buttons_filter() {
		return $this->login_buttons( true );
	}

	public function login_buttons( bool $return = false, $before = false, $after = true ) {
		if ( ! $this->show() ) {
			return;
		}

		$buttons = $this->buttons();

		ob_start();
		include_once LOGIN_ME_NOW_TEMPLATE_PATH . '/login-form.php';
		$html = ob_get_clean();

		if ( $return ) {
			return $html;
		}

		echo $html;
	}

	public function buttons(): array {
		$array    = [];
		$google   = new GoogleButton();
		$facebook = new FacebookButton();

		if ( $google->native_login() ) {
			$array['google'] = $google;
		}

		if ( $facebook->native_login() ) {
			$array['facebook'] = $facebook;
		}

		return $array;
	}

	public function show(): bool {
		if (
			FacebookLogin::show()
			|| GoogleLogin::show()
		) {
			return true;
		}

		return false;
	}
}