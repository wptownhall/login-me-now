<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Abstracts;

defined( 'ABSPATH' ) || exit;

use LoginMeNow\Traits\Singleton;
use WP_Error;
use WP_REST_Request;
use \WP_REST_Controller;

abstract class RouteBase extends WP_REST_Controller {
	use Singleton;

	protected $namespace = 'login-me-now';

	public function __construct() {
		add_action( 'rest_api_init', [$this, 'register_routes'] );
	}

	/**
	 * Check whether a given request has permission to read notes.
	 */
	public function get_permissions_check( WP_REST_Request $request ) {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return new WP_Error( 'login_me_now_rest_cannot_view', __( 'Sorry, you cannot list resources.', 'login-me-now' ), ['status' => rest_authorization_required_code()] );
		}

		return true;
	}
}
