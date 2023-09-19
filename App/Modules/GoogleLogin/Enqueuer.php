<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\GoogleLogin;

use LoginMeNow\Abstracts\EnqueuerBase;
use LoginMeNow\Traits\Hookable;

/**
 * Assets Enqueuer
 */
class Enqueuer extends EnqueuerBase {
	use Hookable;

	public function __construct() {
		$this->action( 'wp_enqueue_scripts', 'enqueue_scripts', 50 );
		$this->action( 'login_enqueue_scripts', 'enqueue_scripts', 1 );
		$this->action( 'login_footer', 'wp_login_script', 50 );
	}

	public function wp_login_script() {?>
		<script type="text/javascript">
			jQuery("#wp-login-google-login-button").prependTo("#loginform");
		</script>
	<?php }

	public function enqueue_scripts() {
		wp_enqueue_script( 'login-me-now-google-client-js', 'https://accounts.google.com/gsi/client' );
	}
}