<?php
/*
    Plugin Name: Custom news posts
    Description: Simple implementation of a custom news posts into WordPress
    Author: Chagovskaya Tanya
    Version: 10.17
*/
add_theme_support( 'post-thumbnails' );
/* News*/
function custom_news_posts_init() {
    register_post_type( 'news_posts',
        array(
            'label'             => __('Блог'),
            'public'            => true,
            'show_ui'           => true,
            'show_in_nav_menus' => true,
            'menu_position'     => 6,
            'menu_icon'         => 'dashicons-format-aside',
            'has_archive'       => 'news',
            'rewrite'           => array(
                'slug'       => 'news',
                'with_front' => true,
            ),
            'supports' => array(
                'title',
                'thumbnail',
                'excerpt ',
                'editor',
                'custom-fields'
            )
        )
    );
    register_taxonomy_for_object_type('post_tag', 'tag');
}
add_action('init', 'custom_news_posts_init');
?>
