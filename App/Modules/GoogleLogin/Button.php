<?php
/**
 * @author  WPtownhall
 * @since   1.1.0
 * @version 1.4.0
 */

namespace LoginMeNow\GoogleLogin;

use LoginMeNow\Abstracts\LoginButtonBase;

class Button extends LoginButtonBase {

	public function shortcodes(): void {
		add_shortcode( 'login_me_now_google_button', [$this, 'button'] );
	}

	public function button(): string {
		return $this->html();
	}

	public function html( int $width = 270 ): string {
		$width = apply_filters( 'login_me_now_google_button_width', $width );
		$html  = '<div class="g_id_signin"
			data-type="standard"
			data-shape="rectangular"
			data-theme="outline"
			data-text="continue_with"
			data-size="large"
			data-logo_alignment="center"
			data-width="' . $width . '">
			</div>';

		return $html;
	}
}