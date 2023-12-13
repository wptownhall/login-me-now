<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\FacebookLogin;

class Button {

	public function shortcodes(): void {
		add_shortcode( 'login_me_now_facebook_button', [$this, 'button'] );
	}

	public function button(): string {
		return $this->html();
	}

	public function html( int $width = 270 ): string {
		$width = apply_filters( 'login_me_now_facebook_button_width', $width );

		ob_start();
		include_once __DIR__ . '/Views/Button.php';
		$html = ob_get_clean();

		return $html;
	}
}