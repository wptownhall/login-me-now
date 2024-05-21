<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.5.0
 */

namespace LoginMeNow\Abstracts;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

abstract class EnqueuerBase {
	use Singleton;
	use Hookable;

	private string $version = LOGIN_ME_NOW_VERSION;

	public function __construct() {
		$this->action( 'wp_enqueue_scripts', [$this, 'wp_enqueue_scripts'], 15 );
		$this->action( 'admin_enqueue_scripts', [$this, 'admin_enqueue_scripts'] );
		$this->action( 'login_enqueue_scripts', [$this, 'login_enqueue_scripts'] );
	}

	public function admin_enqueue_scripts(): void {}

	public function wp_enqueue_scripts(): void {}

	public function login_enqueue_scripts(): void {}

	public function register_style( string $handle, string $src, array $deps = [] ): void {
		wp_register_style( $handle, $src, $deps, $this->version );
	}

	public function enqueue_style( string $handle ): void {
		wp_enqueue_style( $handle );
	}

	public function register_script( string $handle, string $src, array $deps = [] ): void {
		wp_register_script( $handle, $src, $deps, $this->version );
	}

	public function enqueue_script( string $handle ): void {
		wp_enqueue_script( $handle );
	}
}