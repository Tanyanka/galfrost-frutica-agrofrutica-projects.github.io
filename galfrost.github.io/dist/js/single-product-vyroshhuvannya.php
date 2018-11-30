<?php
?>
<?php
    get_header();
?>

єто работает
<?php
/* Start the Loop */
//if(have_posts()) : while(have_posts()) : the_post();
   get_template_part('inc/product', 'growing', get_post_format());
//endwhile;
//endif;
?>
<?php
    get_footer();
?>
