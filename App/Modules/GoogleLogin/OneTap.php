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

class OneTap {
	use Singleton;
	use Hookable;

	public int $post_id = 0;

	public function __construct() {
		$this->action( 'wp_footer', 'one_tap', 50 );
		$this->action( 'login_footer', 'one_tap', 50 );
		$this->action( 'init', 'template_redirect' );

		// $this->filter( 'login_me_now_google_selected_pages', [$this, 'selected_pages'], 900 );

		if ( $this->show() ) {
			echo '3434 kujdfoi  sdfosdfoij  sdfkjh  ksdfkbjndfgkjdfgkj kljsdgkjh nsdfgnjkdfg';
		}
	}

	public function one_tap() {
		$nonce = wp_create_nonce( 'lmn-google-nonce' );

		if ( ! is_user_logged_in() && $this->show() ) {
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
				data-login_uri="<?php echo esc_attr( $login_uri ); ?>">
			</div>
		<?php }
	}

	public function template_redirect(): void {
		$this->post_id = get_the_ID();
	}

	private function show(): bool {
		$selected_pages = apply_filters( 'login_me_now_google_selected_pages', false );
		$show_on        = Settings::init()->get( 'google_show_on', 'selected_pages' );
		global $wp_query;
		if ( function_exists( 'get_the_ID' ) ) {
			echo '<pre>';
			print_r( $wp_query );
			echo '</pre>';
			echo 'bhut:  ' . $this->post_id;
		}

		switch ( $show_on ) {
			case 'side_wide':
				return true;
				break;

			case 'login_screen':
				return is_login();
				break;

			case 'selected_pages':
				return $this->selected_pages();
				break;
		}

		return false;
	}

	public function selected_pages(): bool {
		$selected_pages = Settings::init()->get( 'google_pro_selected_pages' );
		$array          = explode( ',', $selected_pages );

		if ( ! is_array( $array ) ) {
			return false;
		}

		$array = array_map( 'intval', $array );

		if ( in_array( $this->post_id, $array, true ) ) {
			return true;
		}

		return false;
	}
}