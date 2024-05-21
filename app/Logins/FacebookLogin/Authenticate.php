<?php
/**
 * @author  WPtownhall
 * @since  	1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\Logins\FacebookLogin;

use LoginMeNow\Abstracts\AuthenticateBase;

class Authenticate extends AuthenticateBase {
	public string $channel       = 'facebook';
	public bool $redirect_return = true;
}