<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\GoogleLogin;

use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Button {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'init', 'shortcodes' );

		$native_login = Settings::init()->get( 'google_native_login', true );
		if ( $native_login ) {
			$this->action( 'login_form', 'wp_login_form' );
			$this->action( 'woocommerce_login_form_start', 'wp_login_form' );
		}
	}

	public function wp_login_form(): void {?>
		<div id="wp-login-google-login-button">
			<div class="g_id_signin"
				data-type="standard"
				data-shape="rectangular"
				data-theme="outline"
				data-text="continue_with"
				data-size="large"
				data-logo_alignment="center"
				data-width="270">
			</div>
			<div style="text-align: center; margin: 10px 0;"><?php esc_html_e( 'Or', 'login-me-now' );?></div>
		</div>
	<?php }

	public function shortcodes(): void{
		add_shortcode( 'login_me_now_google_button', [$this, 'login_btn'] );
	}

	public function login_btn(): string {
		if ( ! is_user_logged_in() ) {
			$html = '<div class="g_id_signin"
			data-type="standard"
			data-shape="rectangular"
			data-theme="outline"
			data-text="continue_with"
			data-size="large"
			data-logo_alignment="center">
			</div>';

			return $html;
		}

		return '';
	}
}