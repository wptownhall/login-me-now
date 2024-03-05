<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

if ( ! $buttons || 0 === count( $buttons ) ) {
	return;
}
?>

<div id="wp-login-login-me-now-buttons">

	<?php if ( $before ): ?>
		<div style="text-align: center; margin: 10px 0;">
			<?php esc_html_e( 'Or', 'login-me-now' );?>
		</div>
	<?php endif;?>

	<?php foreach ( $buttons as $button ): ?>
		<?php echo $button->button(); ?>
	<?php endforeach;?>

	<?php if ( $after ): ?>
		<div style="text-align: center; margin: 10px 0;">
			<?php esc_html_e( 'Or', 'login-me-now' );?>
		</div>
	<?php endif;?>

	<style>
		#wp-login-login-me-now-buttons {
			display: flex;
			flex-direction:
			column;gap: 8px;
		}
	</style>
</div>