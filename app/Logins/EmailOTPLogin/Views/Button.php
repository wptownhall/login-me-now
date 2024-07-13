<?php
/**
 * @author  Pluginly
 * @since   1.7.0
 * @version 1.7.0
 */
?>

<div class="lmn_email_otp_login">
    <a data-action="lmn-connect" href="<?php echo \LoginMeNow\Logins\EmailOTPLogin\EmailOTPLogin::create_auth_url(); ?>" class="lmn_btn lmn_email_otp_login_button">
		<span class="svg-bg"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="ui-svg-inline mr-2"><path d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4ZM5,6H19a1,1,0,0,1,1,1l-8,4.88L4,7A1,1,0,0,1,5,6ZM20,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9.28l7.48,4.57a1,1,0,0,0,1,0L20,9.28Z"></path></svg></span><span><?php esc_html_e( 'Continue with Email OTP', 'login-me-now' );?></span>
		</a>
</div>