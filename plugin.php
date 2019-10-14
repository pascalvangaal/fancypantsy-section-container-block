<?php
/**
 * Plugin Name: Fancypantsy Section Container Block
 * Plugin URI: https://github.com/pascalvangaal/fancypantsy-section-container-block/
 * Description: A section container block for Gutenberg.
 * Author: Pascal van Gaal
 * Author URI: #
 * Version: 0.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
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
