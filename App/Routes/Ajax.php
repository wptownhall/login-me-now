<?php
/**
 * Login Me Now Admin Ajax Base.
 *
 * @package Login Me Now
 * @since   1.0.0
 * @version 1.2.0
 */

namespace LoginMeNow\Routes;

use LoginMeNow\Model\BrowserToken;
use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\AjaxCheck;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Ajax {
	use Singleton;
	use Hookable;
	use AjaxCheck;

	private array $errors;

	public function __construct() {
		$this->action( 'wp_ajax_login_me_now_update_admin_setting', 'login_me_now_update_admin_setting' );
		$this->action( 'wp_ajax_update_status_of_token', 'update_status_of_token' );
	}

	/**
	 * Return boolean settings for admin dashboard app.
	 */
	public function login_me_now_admin_settings_typewise(): array {
		return apply_filters(
			'login_me_now_admin_settings_datatypes',
			[
				'logs'                             => 'bool',
				'logs_expiration'                  => 'integer',

				'google_login'                     => 'bool',
				'google_client_id'                 => 'string',
				'google_native_login'              => 'bool',
				'google_update_existing_user_data' => 'bool',
				'google_onetap'                    => 'bool',
				'google_cancel_on_tap_outside'     => 'bool',
				'google_onetap_display_location'   => 'string',

				'dm_advance_share'                 => 'bool',
				'dm_express_login_wc'              => 'bool',
				'dm_express_login_edd'             => 'bool',
				'dm_express_login_email'           => 'bool',
				'dm_otp_login'                     => 'bool',

				'social_login'                     => 'bool',
				'user_switching'                   => 'bool',
				'temporary_login'                  => 'bool',
				'browser_extension'                => 'bool',
				'user_switching'                   => 'bool',
				'activity_logs'                    => 'bool',
				'enable_sign_in_facebook'          => 'bool',
				'enable_sign_in_twitter'           => 'bool',
			]
		);
	}

	/**
	 * Save settings.
	 */
	public function login_me_now_update_admin_setting() {
		$error = $this->check_permissions( 'login_me_now_update_admin_setting', 'manage_options' );
		if ( $error ) {
			wp_send_json_error( $error );
		}

		$get_bool_settings = $this->login_me_now_admin_settings_typewise();
		/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$sub_option_key = isset( $_POST['key'] ) ? sanitize_text_field( wp_unslash( $_POST['key'] ) ) : '';
		/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$sub_option_value = '';

		// @codingStandardsIgnoreStart
		if ( isset( $get_bool_settings[$sub_option_key] ) ) {
			if ( 'bool' === $get_bool_settings[$sub_option_key] ) {
				/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
				$val = isset( $_POST['value'] ) && 'true' === sanitize_text_field( $_POST['value'] ) ? true : false;
				/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
				$sub_option_value = $val;
			} else {
				/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
				$val = isset( $_POST['value'] ) ? sanitize_text_field( wp_unslash( $_POST['value'] ) ) : '';
				/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
				$sub_option_value = $val;
			}
		}
		// @codingStandardsIgnoreEnd

		Settings::init()->update( $sub_option_key, $sub_option_value );

		$response_data = [
			'message' => __( 'Successfully saved data!', 'login-me-now' ),
		];

		wp_send_json_success( $response_data );
	}

	/**
	 * Update Particular Extension Token Status
	 */
	public function update_status_of_token() {
		$status = ! empty( $_POST['status'] ) ? sanitize_text_field( $_POST['status'] ) : false;
		$id     = ! empty( $_POST['id'] ) ? sanitize_text_field( $_POST['id'] ) : 0;

		if ( ! $status && ! $id ) {
			wp_send_json( __( "Something wen't wrong!" ) );
			wp_die();
		}

		BrowserToken::init()->update( $id, $status );
		wp_die();
	}
}