<?php
/**
 * @author  WPtownhall
 * @since   1.5.0
 * @version 1.5.0
 */

namespace LoginMeNow\GoogleLogin;

use LoginMeNow\Abstracts\LoginButtonBase;
use LoginMeNow\Model\Settings;

class Button extends LoginButtonBase {

	public function shortcodes(): void {
		add_shortcode( 'login_me_now_google_button', [$this, 'button'] );
	}

	public function button(): string {
		if ( ! GoogleLogin::show() ) {
			return '';
		}

		return $this->html();
	}

	public function html( int $width = 270 ): string {
		$width = apply_filters( 'login_me_now_google_button_width', $width );

		ob_start();
		include_once __DIR__ . '/Views/Button.php';
		$html = ob_get_clean();

		return $html;
	}

	public function native_login(): bool {
		return Settings::init()->get( 'google_native_login', true );
	}
}