<?php
/**
 * @author  Pluginly
 * @since  	1.8
 * @version 1.8
 */

namespace LoginMeNow\Repositories;

use LoginMeNow\Models\UserToken;
use LoginMeNow\Utils\Random;
use LoginMeNow\Utils\Time;
use LoginMeNow\Utils\Translator;

class MagicLinkRepository {

	public string $token_key;
	public bool $disposable;
	public int $expiration = 300;

	public function __construct( string $token_key, bool $disposable = true ) {
		$this->token_key  = $token_key;
		$this->disposable = $disposable;
	}

	/**
	 * Send email the Magic Link
	 *
	 * @param int $user_id
	 * @param string $email
	 *
	 * @return bool
	 */
	public function email_magic_link( int $user_id, string $email ): bool {
		$expiration = $this->expiration;
		$magic_link = $this->create_magic_link( $user_id, $expiration );

		if ( ! $magic_link ) {
			return false;
		}

		// Get site title
		$site_title = get_bloginfo( 'name' );

		// Subject of the email
		$subject = sprintf( __( 'Your Magic Link to %s', 'login-me-now' ), $site_title );

		// Convert expiration time from seconds to a human-readable format
		$readable_expiration = $expiration < 3600
			? sprintf( _n( '%d minute', '%d minutes', $expiration / 60, 'login-me-now' ), $expiration / 60 )
			: ( $expiration < 86400
				? sprintf( _n( '%d hour', '%d hours', $expiration / 3600, 'login-me-now' ), $expiration / 3600 )
				: sprintf( _n( '%d day', '%d days', $expiration / 86400, 'login-me-now' ), $expiration / 86400 ) );

		// Improved email message
		$message = sprintf(
			__(
				"Hi there,<br><br>
				We’re thrilled to have you back at <strong>%s</strong>!<br><br>
				To access your account securely, click the magic link below. For your protection, this link will expire in <strong>%s</strong>:<br><br>
				<div style='text-align: center; margin: 20px 0;'>
					<a href='%s' style='background-color: #0073aa; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px; font-weight: bold;'>Login Me Now</a>
				</div><br>
				If you did not request this email, you can safely ignore it.<br><br>
				Best regards,<br>
				<strong>The %s Team</strong><br><br>
				<hr style='border: 0; border-top: 1px solid #ddd; margin: 20px 0;'>
				<small style='color: #555;'>%s</small>",
				'login-me-now'
			),
			$site_title,
			$readable_expiration,
			$magic_link['link'],
			$site_title,
			$site_title
		);

		// Headers with HTML content type
		$headers = ['Content-Type: text/html; charset=UTF-8'];

		return wp_mail( $email, $subject, $message, $headers );
	}

	/**
	 * Create Magic Link based on User ID and Expiration
	 *
	 * @param int $user_id
	 * @return array|bool
	 */
	public function create_magic_link( int $user_id ) {
		if ( ! function_exists( 'get_userdata' ) ) {
			require_once ABSPATH . WPINC . '/pluggable.php';
		}

		$user = get_userdata( $user_id );
		if ( ! $user ) {
			return false;
		}

		$token = $this->generate_token(
			$user,
			apply_filters( 'login_me_now_magic_link_expire', ( Time::now() + 3 + $this->expiration ) )
		);

		if ( ! $token ) {
			return false;
		}

		$link = sprintf( '%s%s', admin_url( '/?lmn-magic-link=' ), $token );

		return [
			'link'    => $link,
			'message' => __( 'Magic link generated successfully!', 'login-me-now' ),
		];
	}

	/**
	 * Verify the user token and return user ID or 0
	 *
	 * @param string $token
	 * @return int
	 */
	public function verify_token( string $token ): int {
		if ( ! $token ) {
			return false;
		}

		$data    = Translator::decode( $token );
		$user_id = (int) $data[0] ?? 0;
		$number  = (int) $data[1] ?? 0;
		$expire  = (int) $data[2] ?? 0;

		if ( ! $user_id || ! $number || ! $expire ) {
			return false;
		}

		if ( ! self::is_valid_token( $user_id, $number, $expire ) ) {
			return false;
		}

		return (int) $user_id;
	}

	/**
	 * Validate the token and return true or false
	 *
	 * @param int $user_id
	 * @param int $number
	 * @param int $expire
	 * @return bool
	 */
	private function is_valid_token( int $user_id, int $number, int $expire ): bool {
		$user_meta = get_user_meta( $user_id, $this->token_key, false );

		/**
		 * Early exit, If no meta found
		 */
		if ( ! $user_meta ) {
			return false;
		}

		/**
		 * Check whether the user has the valid token in usermeta or not
		 */
		foreach ( $user_meta as $token ) {
			$_number = (int) $token['number'] ?? 0;
			$_expire = (int) $token['expire'] ?? 0;
			$status  = $token['status'] ?? '';

			if ( $this->disposable ) {
				delete_user_meta( $user_id, $this->token_key );
			}

			if (
				$_number === $number
				&& $_expire === $expire
				&& 'pause' !== $status
				&& ! Time::expired( $token['expire'] )
			) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Generate token based on user ID and expiration
	 *
	 * @param \WP_User $user
	 * @param int $secs
	 * @return string
	 */
	private function generate_token( \WP_User $user, int $secs ): string {
		$issued_at = Time::now();
		$expire    = apply_filters( 'login_me_now_magic_link_expire', $secs, $issued_at );

		$number = Random::number();
		$token  = Translator::encode( $user->data->ID, $number, $expire, '==' );

		UserToken::init()->insert(
			$user->data->ID,
			[
				'number'     => $number,
				'created_at' => $issued_at,
				'created_by' => get_current_user_id(),
				'expire'     => $expire,
			]
		);

		\LoginMeNow\Integrations\SimpleHistory\Logs::add( $user->data->ID, "generated an email magic link" );

		return $token;
	}

	/**
	 * ================================
	 *  The magic link CRUD Operations
	 * ================================
	 */
	public function insert( int $user_id, array $data ): bool {
		return add_user_meta( $user_id, $this->token_key, $data );
	}

	public function update( int $meta_id, array $value ): bool {
		global $wpdb;

		$table = _get_meta_table( 'user' );

		$value['last_updated'] = Time::now();
		$value['updated_by']   = get_current_user_id();

		$updated = $wpdb->update(
			$table,
			['meta_value' => serialize( $value )],
			['umeta_id' => $meta_id]
		);

		return $updated;
	}

	public function get( int $meta_id ) {
		global $wpdb;

		$table = _get_meta_table( 'user' );

		$results = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT meta_value FROM $table WHERE umeta_id  = %s",
				$meta_id
			)
		);

		return $results;
	}

	public function drop( int $meta_id ): bool {
		global $wpdb;

		$table = _get_meta_table( 'user' );

		$deleted = $wpdb->delete(
			$table,
			['umeta_id' => $meta_id]
		);

		return $deleted;
	}

	public function extend_time( int $meta_id, int $timestamp ): bool {
		if ( ! $meta_id || ! $timestamp ) {
			return false;
		}

		$meta_value = $this->get( $meta_id )[0]->meta_value ?? null;

		if ( ! $meta_value ) {
			return false;
		}

		$meta_value           = maybe_unserialize( $meta_value );
		$meta_value['expire'] = $timestamp;

		return $this->update( $meta_id, $meta_value );
	}

	public function update_status( int $meta_id, string $status ): bool {
		if ( ! $meta_id || ! $status ) {
			return false;
		}

		$meta_value = $this->get( $meta_id )[0]->meta_value ?? null;

		if ( ! $meta_value ) {
			return false;
		}

		$status               = 'pause' === $status ? 'pause' : 'active';
		$meta_value           = maybe_unserialize( $meta_value );
		$meta_value['status'] = $status;

		return $this->update( $meta_id, $meta_value );
	}

	public function get_all( int $offset = 0, int $limit = 10 ): array {
		global $wpdb;

		$table = _get_meta_table( 'user' );

		$results = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM $table WHERE meta_key = %s LIMIT %d OFFSET %d",
				$this->token_key,
				$limit,
				$offset
			)
		);

		foreach ( $results as $key => $meta ) {
			$results[$key]->meta_value   = unserialize( $results[$key]->meta_value );
			$results[$key]->display_name = User::display_name( $meta->user_id );
			$results[$key]->user_login   = User::login( $meta->user_id );
		}

		return $results;
	}
}