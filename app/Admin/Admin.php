<?php
/**
 * @author  Pluginly
 * @since   1.0.0
 * @version 1.7.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Admin\AdminMenu;
use LoginMeNow\Common\Singleton;

class Admin {
	use Singleton;

	public function __construct() {
		AdminMenu::init();
		Enqueuer::init();

		add_filter( 'admin_footer_text', [$this, 'admin_footer_link'], 99 );
	}

	public function admin_footer_link() {
		echo '<span id="footer-thankyou"> Thank you for using <span class="focus:text-astra-hover active:text-astra-hover hover:text-lmn-hover"> ' . esc_attr( __( 'Login Me Now', 'login-me-now' ) ) . '.</span></span>';
	}
}