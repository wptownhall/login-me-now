<?php
/**
 * @author  Pluginly
 * @since  	1.8
 * @version 1.8
 */

namespace LoginMeNow\Controllers;

use WP_REST_Request;

class SettingsController {
	public function save( WP_REST_Request $request ) {

		$params = $request->get_params();

		wp_send_json_success( [
			'message' => __( 'Settings Save Testings', 'login-me-now' ),
			'params'  => $params,
		] );
	}
}