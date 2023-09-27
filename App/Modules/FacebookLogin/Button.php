<?php
/**
 * @author  HalalBrains
 * @since   1.1.0
 * @version 1.1.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Button {
	use Singleton;
	use Hookable;

	public function html(): string {
		wp_enqueue_script( 'login-me-now-facebook-sdk-js' );
		wp_enqueue_script( 'login-me-now-facebook-button-config' );

		$html = '<button type="button" class="lmn-facebook-login-button" disabled>';
		$html .= __( 'Continue With Facebook', 'login-me-now' );
		$html .= '</button>';

		return $html;
	}
}