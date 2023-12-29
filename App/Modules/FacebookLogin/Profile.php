<?php
/**
 * @author  HeyMehedi
 * @since   1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Utils\User;

class Profile {
	use Hookable;

	public function __construct() {
		$this->filter( 'get_avatar_url', 'avatar', 10, 2 );
	}

	public function avatar( $url, $id_or_email ) {
		$user_avatar = Settings::init()->get( 'facebook_pro_user_avatar', false );
		if ( ! $user_avatar ) {
			return $url;
		}

		if ( null === $id_or_email || is_object( $id_or_email ) ) {
			return $url;
		}

		$user_id = 0;
		if ( is_email( $id_or_email ) && email_exists( $id_or_email ) ) {
			$user    = get_user_by( 'email', $id_or_email );
			$user_id = (int) $user->ID;
		} elseif ( is_int( $id_or_email ) ) {
			$user_id = (int) $id_or_email;
		} else {
			return $url;
		}

		if ( $user_id ) {
			$_url = User::avatar_url( $user_id, 'facebook' );
			$url  = $_url ? str_replace( '=s96-c', '', $_url ) : $url;
		}

		return $url;
	}
}