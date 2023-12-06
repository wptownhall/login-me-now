<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Button {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'init', 'shortcodes' );

		$native_login = Settings::init()->get( 'facebook_native_login', true );

		if ( $native_login ) {
			$this->action( 'login_form', 'wp_login_form' );
			$this->action( 'woocommerce_login_form_start', 'wp_login_form' );
		}
	}

	public function shortcodes(): void {
		add_shortcode( 'login_me_now_facebook_button', [$this, 'login_btn'] );
	}

	public function wp_login_form(): void {
		echo $this->login_btn();
	}

	public function login_btn(): string {
		if ( ! is_user_logged_in() ) {
			return $this->html( 300 );
		}

		return '';
	}

	public function html( int $width ): string {
		$width = apply_filters( 'login_me_now_facebook_button_width', $width );
		$html  = '<a href="#" class="facebook_login_button">
		Facebook Login
			</a>';

		return $html;
	}
}