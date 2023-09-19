<?php
/**
 * @author  HalalBrains
 * @since   1.1.0
 * @version 1.1.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class LoginButton {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'init', 'shortcodes' );

		$native_login = Settings::init()->get( 'google_native_login' );
		if ( $native_login ) {
			$this->action( 'login_form', 'wp_login_form' );
			$this->action( 'woocommerce_login_form_start', 'wp_login_form' );
		}
	}

	public function atbdp_social_login_html() {
		$facebook_icon = plugin_dir_url( __FILE__ ) . 'assets/public/images/facebook-icon.png';
		$redirect_url  = '';
		$nonce         = wp_create_nonce( 'directorist-social-login-widget' );
		$api           = '';

		?>
		<button type="button" disabled class="btn fb-login az-fb-login-btn">
			<span class="azbdp-fb-loading"><span class="fas fa-spin fa-spinner"></span></span>
			<img src="<?php echo esc_url( $facebook_icon ); ?>" alt="Facebook Icon"/> <?php _e( 'Continue With Facebook', 'directorist-social-login' )?>
		</button>
	<?php }

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

	public function shortcodes(): void {
		add_shortcode( 'login_me_now_facebook_button', [$this, 'login_btn'] );
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