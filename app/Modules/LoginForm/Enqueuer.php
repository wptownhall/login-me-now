<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\LoginForm;

use LoginMeNow\Abstracts\EnqueuerBase;

class Enqueuer extends EnqueuerBase {
	public function __construct() {
		$this->action( 'login_footer', 'wp_login_script', 50 );
	}

	public function wp_login_script() {?>
		<script type="text/javascript">
			jQuery("#wp-login-login-me-now-buttons").prependTo("#loginform");
		</script>
	<?php }
}