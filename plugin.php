<?php
/**
 * Plugin Name: Fancypantsy Section Container Block
 * Plugin URI: https://github.com/pascalvangaal/fancypantsy-section-container-block/
 * Description: A Section Container Block for Gutenberg.
 * Author: Pascal van Gaal
 * Author URI: https://github.com/pascalvangaal/fancypantsy-section-container-block
 * Version: 1.1.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: fancypantsy-section-container-block
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
