<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function fp_section_container_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'fp_section_container_block_css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'fp_section_container_block_js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'fp_section_container_block_admin_css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `fpscbglobal` object.
	wp_localize_script(
		'fp_section_container_block_js',
		'fpscbglobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' 		=> plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  		=> plugin_dir_url( __DIR__ ),
			'allowedColumnBlocks'	=> apply_filters( 'fp_allowed_inner_column_blocks', [], 10, 1 )
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'fp/section-container-block', array(
			'style'         	=> 'fp_section_container_block_css',
			'editor_script' 	=> 'fp_section_container_block_js',
			'editor_style'  	=> 'fp_section_container_block_admin_css',
			'render_callback' 	=> 'fp_section_container_block_callback',
		)
	);

	register_block_type(
		'fp/column-block', array(
			'style'         	=> 'fp_section_container_block_css',
			'editor_script' 	=> 'fp_section_container_block_js',
			'editor_style'  	=> 'fp_section_container_block_admin_css',
		)
	);

	function fp_section_container_block_callback( $attributes, $content ) {
		return html_entity_decode( $content );
	}

	wp_set_script_translations( 'translation-script', 'fancypantsy-section-container-block' );
}

// Hook: Block assets.
add_action( 'init', 'fp_section_container_block_assets' );
