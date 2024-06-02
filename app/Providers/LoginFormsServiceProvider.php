<?php
/**
 * @author  WPtownhall
 * @since   1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Providers;

use LoginMeNow\Common\ProviderBase;
use LoginMeNow\Logins\FacebookLogin\Button as FacebookButton;
use LoginMeNow\Logins\FacebookLogin\FacebookLogin;
use LoginMeNow\Logins\GoogleLogin\Button as GoogleButton;
use LoginMeNow\Logins\GoogleLogin\GoogleLogin;

class LoginFormsServiceProvider extends ProviderBase {

	use \LoginMeNow\Common\Hookable;

	public function boot() {
		$this->action( 'login_footer', [$this, 'wp_login_script'], 50 );

		$this->action( 'login_form', [$this, 'login_buttons'] );
		$this->action( 'register_form', [$this, 'login_buttons'] );
		$this->filter( 'login_form_top', [$this, 'login_buttons_filter'] );
	}

	public function login_buttons_filter() {
		return $this->login_buttons( true );
	}

	public function login_buttons( bool $return = false, $before = false, $after = true ) {
		if ( ! $this->show() ) {
			return;
		}

		$buttons = $this->buttons();

		ob_start();
		include_once LOGIN_ME_NOW_TEMPLATE_PATH . '/login-form.php';
		$html = ob_get_clean();

		if ( $return ) {
			return $html;
		}

		echo $html;
	}

	public function buttons(): array {
		$array    = [];
		$google   = new GoogleButton();
		$facebook = new FacebookButton();

		if ( $google->native_login() ) {
			$array['google'] = $google;
		}

		if ( $facebook->native_login() ) {
			$array['facebook'] = $facebook;
		}

		return $array;
	}

	public function show(): bool {
		if (
			FacebookLogin::show()
			|| GoogleLogin::show()
		) {
			return true;
		}

		return false;
	}

	public function wp_login_script() {?>
		<script type="text/javascript">
			jQuery("#wp-login-login-me-now-buttons").prependTo("#loginform");
		</script>
	<?php }
}