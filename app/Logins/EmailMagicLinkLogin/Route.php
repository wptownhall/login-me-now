<?php
/**
 * @author  Pluginly
 * @since   1.8
 * @version 1.8
 */

namespace LoginMeNow\Logins\EmailMagicLinkLogin;

defined( 'ABSPATH' ) || exit;

class Route extends \LoginMeNow\Common\RouteBase {

	public function register_routes(): void {
		$this->post( '/send-magic-link', [$this, 'send_link'] );
	}

	/**
	 * Send magic link
	 */
	public function send_link( \WP_REST_Request $request ) {
		$nonce = ! empty( $_POST['wpnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['wpnonce'] ) ) : '';

		if ( ! wp_verify_nonce( $nonce, 'lmn-magic-link-nonce' ) ) {
			return;
		}

		wp_send_json_error( ['status' => $nonce] );
	}

	public function permission_check( \WP_REST_Request $request ) {
		$this->request = $request;

		return true;
	}
}