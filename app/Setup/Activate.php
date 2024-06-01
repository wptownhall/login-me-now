<?php
/**
 * @author  WPtownhall
 * @since   1.6.0
 * @version 1.6.0
 */
namespace LoginMeNow\Setup;

use HeyMehedi\Utils\Config;

class Activate {
	public string $file_name;

	public function __construct( $file_name ) {
		$this->file_name = $file_name;
		$this->auto_deactivate();
	}

	public function auto_deactivate(): void {
		if ( Compatibility::php() ) {
			return;
		}

		deactivate_plugins( basename( $this->file_name ) );

		$error = __( '<h1>An Error Occurred</h1>', 'login-me-now' );
		$error .= __( '<h2>Your installed PHP Version is: ', 'login-me-now' ) . PHP_VERSION . '</h2>';
		$error .= __( '<p>The <strong>Login Me Now</strong> plugin requires PHP version <strong>', 'login-me-now' ) . Config::get( 'min_php' ) . __( '</strong> or greater', 'login-me-now' );
		$error .= __( '<p>The version of your PHP is ', 'login-me-now' ) . '<a href="http://php.net/supported-versions.php" target="_blank"><strong>' . __( 'unsupported and old', 'login-me-now' ) . '</strong></a>.';
		$error .= __( 'You should update your PHP software or contact your host regarding this matter.</p>', 'login-me-now' );
		wp_die(
			wp_kses_post( $error ),
			esc_html__( 'Plugin Activation Error', 'login-me-now' ),
			[
				'response'  => 200,
				'back_link' => true,
			]
		);
	}
}
