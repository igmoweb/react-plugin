<?php
/**
 * Plugin Name: React Plugin
 */

class React_Plugin {

	private $page_id;

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function admin_menu() {
		$this->page_id = add_menu_page(
			'React Plugin',
			'React Plugin',
			'manage_options',
			'react-plugin',
			array( $this, 'render_menu' )
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

	public function enqueue_scripts( $hook ) {
		global $wp_version;
		if ( $this->page_id === $hook ) {
			wp_enqueue_script( 'react-plugin', plugin_dir_url( __FILE__ ) . 'build/app.js', array(), $wp_version, true );
		}
	}
}

new React_Plugin();