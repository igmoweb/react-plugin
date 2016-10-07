<?php

/**
 * Plugin Name: React Plugin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class React_Plugin {
	private static $instance;

	private $page_id;

	public static function get_instance() {
		return self::$instance ? self::$instance : new self();
	}

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );

		/** -- */
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function admin_menu() {
		$this->page_id = add_menu_page(
			'React Plugin',
			'React Plugin',
			'manage_options',
			'react-plugin',
			array(
				$this,
				'render_menu'
			)
		);
	}

	public function render_menu() {
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<div id="app"></div>
		</div>
		<?php
	}

	/**
	 * --
	 */
	public function enqueue_scripts( $hook ) {
		if ( $this->page_id === $hook ) {
			wp_enqueue_script( 'react-plugin', plugin_dir_url( __FILE__ ) . 'build/app.js' );
		}
	}
}

function react_plugin() {
	return React_Plugin::get_instance();
}

add_action( 'plugins_loaded', 'react_plugin' );