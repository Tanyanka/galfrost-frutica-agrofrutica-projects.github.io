<?php
/**
 * styledstore functions and definitions.
 *
 *
 * @package ohvat
 */

if ( ! function_exists( 'galfrost_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 */
	
	function galfrost_setup() {
		
		// add scripts and stylesheets
		// 
		function enqueue_styles() {
			wp_enqueue_style( 'style', get_stylesheet_uri());
			wp_register_script( 'main-script', get_template_directory_uri() . '/dist/js/src/script.js', array('jquery'), '02.07.18', true );
			wp_enqueue_script( 'main-script' );

}
		add_action('wp_enqueue_scripts', 'enqueue_styles');
			

		// Register new thumb
	  	/*add_image_size('secondblock', 384, 329, true);
	  	add_image_size('secondblock-mob', 320, 275, true);
		add_image_size('trenner', 171, 171, true);
		add_image_size('logo-small', 68, 60, true);*/
		
		
		//
		// Register widget for WPML
		//
		
		register_sidebar( array(
        	'name' => __( 'WPML langueges', '' ),
        	'id' => 'top-langueges',
        	'description' => __( 'Переключатель языка', '' ),
        	'before_widget' => '',
        	'after_widget' => '',
    		) );
		
		//
		//delete wordpress autoformatting
		//

		remove_filter( 'the_content', 'wpautop' ); // remove autoformatting in complete posts
		remove_filter( 'the_excerpt', 'wpautop' ); // remove autoformatting in short posts
		remove_filter('comment_text', 'wpautop'); // remove autoformatting in reviews

		//
		// Remove emoji
		//
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('wp_print_styles', 'print_emoji_styles');
		
		// Remove dns-prefetch
		// Windows Live Writer
		// Remove edite from www
		// remove shotlink
		// 
		remove_action( 'wp_head', 'wp_resource_hints', 2);
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'rsd_link' );
		remove_action('wp_head', 'wp_shortlink_wp_head');
		//
		// remove jQuery migrate
		// 
		
		function isa_remove_jquery_migrate( &$scripts) {
    		if(!is_admin()) {
        		$scripts->remove( 'jquery');
        		$scripts->add( 'jquery', false, array( 'jquery-core' ), '1.12.4' );
    		}
		}
		add_filter( 'wp_default_scripts', 'isa_remove_jquery_migrate' );
		
		//
		// Remove default menu items
		//
		
		function remove_default_menus() {
    		remove_menu_page( 'edit.php' );                   //Posts
    		remove_menu_page( 'edit-comments.php' );          //Comments
            remove_menu_page( 'tools.php' );                  //Tools
		}
		add_action('admin_menu','remove_default_menus');
		
		//
		// Hide version wordpress
		//
	
		function true_remove_wp_version_wp_head_feed() {
    		return '';
		}

		add_filter('the_generator', 'true_remove_wp_version_wp_head_feed');

		//
		// Disablel admin bar on frontend
		//

		show_admin_bar(false);
		

		//
		//	remove default editor from pages end posts
		//

		add_action( 'init', 'my_remove_post_type_support', 10 );
		function my_remove_post_type_support() {
			remove_post_type_support( 'page', 'editor' );
		}


	}

endif; // galfrost_setup


		
		//
		// add menu support
		//

		add_action( 'after_setup_theme', 'galfrost_setup' );

		add_action('after_setup_theme', function(){
    		register_nav_menus( array(
        	'main-menu' => 'Maine heading menu'
    		) );
		});
		
		//
		// remove all scripts from head, body. Add scripts to footer
		//
		
		function footer_enqueue_scripts(){
			remove_action('wp_head','wp_print_scripts');
			remove_action('wp_head','wp_print_head_scripts',9);
			remove_action('wp_head','wp_enqueue_scripts',1);
			add_action('wp_footer','wp_print_scripts',5);
			add_action('wp_footer','wp_enqueue_scripts',5);
			add_action('wp_footer','wp_print_head_scripts',5);
		}
		add_action('after_setup_theme','footer_enqueue_scripts');
		
		//
		// deregister all styles link and adding it to style.css
		// 
		
		function remove_styles() {
			wp_deregister_style('contact-form-7');
			wp_deregister_style('wordfenceAJAXcss');
			wp_deregister_style('style');
		}
		
		//
		// add options item to wp menu
		//
		
		add_action ('wp_enqueue_scripts','remove_styles',100);
		if( function_exists('acf_add_options_page') ) {
	
				acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'well-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	
		}
?>