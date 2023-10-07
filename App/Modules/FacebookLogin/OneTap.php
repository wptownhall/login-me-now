<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class OneTap {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'wp_footer', 'one_tap', 50 );
		$this->action( 'login_footer', 'one_tap', 50 );
	}

	public function one_tap() {
		$nonce   = wp_create_nonce( 'lmn-google-nonce' );
		$exclude = apply_filters( 'login_me_now_google_selected_pages', false );

		if ( ! is_user_logged_in() && ! $exclude ) {
			global $wp;
			$client_id      = Settings::init()->get( 'google_client_id' );
			$cancel_outside = Settings::init()->get( 'google_cancel_on_tap_outside', true );
			$current_url    = home_url( add_query_arg( [], $wp->request ) );
			$login_uri      = home_url() . '/?lmn-google';
			?>
			<div id="g_id_onload"
				data-client_id="<?php echo esc_attr( $client_id ); ?>"
				data-context=""
				data-itp_support="true"
				data-wpnonce="<?php echo esc_attr( $nonce ); ?>"
				data-redirect_uri="<?php echo esc_attr( $current_url ); ?>"
				data-cancel_on_tap_outside="<?php echo esc_attr( $cancel_outside ? 'true' : 'false' ); ?>"
				data-login_uri="<?php echo esc_attr( $login_uri ); ?>"
			</div>
		<?php }
	}
}