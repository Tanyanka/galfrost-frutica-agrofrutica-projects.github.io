<?php
/*
    Plugin Name: Custom products posts
    Description: Simple implementation of a custom products posts into WordPress
    Author: Chagovskaya Tanya
    Version: 10.17
*/
add_theme_support( 'post-thumbnails' );
/* Products*/
function custom_products_posts_init() {
    register_post_type( 'products-posts',
        array(
            'label'             => __('Продукция'),
            'public'            => true,
            'show_ui'           => true,
            'show_in_nav_menus' => false,
            'menu_position'     => 5,
            'menu_icon'         => 'dashicons-cart',
            'rewrite'           => array(
                'slug'       => 'products-view',
                'with_front' => FALSE,
            ),
            'supports' => array(
                'title',
                'thumbnail',
                'excerpt ',
                'custom-fields'
            )
        )
    );
}
add_action('init', 'custom_products_posts_init');
?>
