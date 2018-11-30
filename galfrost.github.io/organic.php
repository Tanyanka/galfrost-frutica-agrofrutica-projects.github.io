<?php

/*
Template Name: Organic
*/

?>
<?php
get_header();
?>
    <main>
        <section class="organik-description">
            <h1><?php the_title(); ?></h1>
            <div>
                <?php the_field('describe'); ?>
            </div>
        </section>
        <div class="bg-img organik-bg-img">

        </div>
        <section class="organic products active">
            <div class="products-container">
                <div class="content row j-spb">
                    <div class="cl-4 product-list">
                        <h2>
                            <?php the_field('organic_product_group'); ?>
                        </h2>
                        <p class="subtitle">
                            <?php the_field('organic_product_group_sub'); ?>
                        </p>
                        <?php
                        // check if the repeater field has rows of data
                        if (have_rows('organic_range')):

                            // loop through the rows of data
                            while (have_rows('organic_range')) : the_row();

                                // display a sub fields value
                                ?>

                                <div class="product-item row">

                                    <img src="<?php the_sub_field('product_img'); ?>" height="45" width="45"
                                         alt="<?php the_sub_field('berry'); ?>"/>
                                    <div class="product">
                                        <?php
                                        $kind = get_sub_field_object('kind');
                                        $value = $kind['value'];
                                        $label = $kind['label'];
                                        ?>
                                        <p class="product-name <?php if (get_sub_field('eco_boolean')): ?><?php echo 'eco' ?><?php endif ?>"><?php the_sub_field('berry'); ?></p>
                                        <p class="product-describe"><?php echo $kind['value']; ?></p>
                                    </div>
                                </div>
                                <?php

                            endwhile;
                        endif;

                        ?>
                        <p class="subtitle">
                            <?php the_field('organic_sub_group_sub'); ?>
                        </p>
                        <?php

                        // check if the repeater field has rows of data
                        if (have_rows('organic_sub_range')):

                            // loop through the rows of data
                            while (have_rows('organic_sub_range')) : the_row();

                                // display a sub fields value
                                ?>

                                <div class="product-item row">

                                    <img src="<?php the_sub_field('product_img'); ?>" height="45" width="45"
                                         alt="<?php the_sub_field('berry'); ?>"/>
                                    <div class="product">
                                        <?php
                                        $kind = get_sub_field_object('kind');
                                        $value = $kind['value'];
                                        $label = $kind['label'];
                                        ?>
                                        <p class="product-name <?php if (get_sub_field('eco_boolean')): ?><?php echo 'eco' ?><?php endif ?>"><?php the_sub_field('berry'); ?></p>
                                        <p class="product-describe"><?php echo $kind['value']; ?></p>
                                    </div>
                                </div>
                                <?php

                            endwhile;
                        endif;

                        ?>
                    </div>
                        <div class="cl-8 mob-none main-img-container">
                            <div class="product-img">
                                <?php
                                if (has_post_thumbnail()) {
                                    $large_image_url = wp_get_attachment_image_src(get_post_thumbnail_id(), 'full');
                                    echo '<img src="' . $large_image_url[0] . '" alt="' . the_title_attribute('echo=0') . '" />';
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                    <div class="stop-img-block content organic-text">
                        <?php the_field('organic_content'); ?>
                    </div>
                </div>
        </section>
    </main>
<?php get_template_part('contact'); ?>
<?php
get_footer();
?>