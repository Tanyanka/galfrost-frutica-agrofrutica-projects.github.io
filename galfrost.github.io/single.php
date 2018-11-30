<?php
get_header();
?>
<?php
/* Start the Loop */
if (have_posts()) : while (have_posts()) : the_post(); ?>

<section class="content">
    <div class="company-width blog-single-welcome">
        <div class="row">
            <?php $tags = get_the_terms($post->id, 'news_tag');
            if ($tags) {
                foreach ($tags as $tag) {
                    ?>
                    <a href="<?php echo get_term_link((int)$tag->term_id, $tag->taxonomy); ?>" class="tag">
                        <?php echo $tag->name; ?>
                    </a>
                <?php }
            } ?>
        </div>
        <h1><?php the_title(); ?></h1>
        <time datetime="<?php echo get_the_date('d.m.Y'); ?>" class="date"><?php echo get_the_date('F j, Y'); ?></time>
        <div class="blog-single-share row open-share-popup">
            <div class="share-icon">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 15 15.5"
                     width="18" height="24">
                    <polygon points="10.1,4.1 10.9,3.4 7.5,0 4.1,3.4 4.9,4.1 7,1.9 7,12.7 8,12.7 8,1.9 "/>
                    <polygon
                            points="9.5,5.5 9.5,6.5 14,6.5 14,14.5 1,14.5 1,6.5 5.5,6.5 5.5,5.5 0,5.5 0,15.5 15,15.5 15,5.5 "/>
                </svg>
            </div>
            <p><?php the_field('share', 'option'); ?> </p>
        </div>
        <?php if(get_field('post_describ')) {
            ?>

            <div class="news-description">
                <?php the_field('post_describ'); ?>
            </div>
        <?php } ?>
    </div>
</section>
<main>
    <section class="content">
        <div class="single-blog-info company-width">
            <?php $section = get_field('section_post'); ?>
            <?php if($section) {
            ?>
            <h3><?php echo $section['title']; ?></h3>
            <?php echo $section['describ']; ?>
            <?php } ?>
        </div>
    </section>
</main>
<?php
$imgs = get_field('post_slider');
if ($imgs) : ?>
    <div class="single-blog-slider">
        <div class="single-blog-slider-items blog-slider">
            <?php
            $i = 1;
            foreach ($imgs as $img): ?>
                <div data-hash="slide-<?php echo $i; ?>" class="single-blog-slider-item">
                    <?php $i++;?>
                    <div class="blog-img-slider" style="background: url(<?php echo $img['sizes']['product-gallery-big']; ?>) center center no-repeat; background-size: cover;">

                    </div>
                    <!--<img src="<?php echo $img['sizes']['product-gallery-big']; ?>" alt="<?php echo $image['alt']; ?>" />-->

                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="single-blog-slider-navigation">
        <ul class="row sm-none">
            <?php
            $k = 0;
            foreach ($imgs as $img): ?>
                <li class="nav-slider-item-wrap">
                    <?php $k++;
                    echo wp_get_attachment_image($img['ID'], 'single-small'); ?>
                    <a href="#slide-<?php echo $k; ?>" rel="nofollow" class="<?php if($k == 1): echo 'active'; endif; ?> nav-slide-item">
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>
<section class="content">
    <?php $section2 = get_field('section_post_2');
    if($section2) {
        ?>
        <div class="single-blog-info company-width">
            <h3><?php echo $section2['title']; ?></h3>
            <?php echo $section2['describ']; ?>
        </div>
    <?php } ?>
    <div class="single-blog-buttons-wrapper company-width row j-spb al-c">
        <a class="back">
            <span><?php the_field('return', 'option'); ?></span>
        </a>
        <div class="blog-single-share row open-share-popup">
            <div class="share-icon">
                <svg version="1.1" id="download-file-share-information"
                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 15 15.5"
                     width="31" height="41" xml:space="preserve">
                        <polygon points="10.1,4.1 10.9,3.4 7.5,0 4.1,3.4 4.9,4.1 7,1.9 7,12.7 8,12.7 8,1.9 "/>
                    <polygon
                            points="9.5,5.5 9.5,6.5 14,6.5 14,14.5 1,14.5 1,6.5 5.5,6.5 5.5,5.5 0,5.5 0,15.5 15,15.5 15,5.5 "/>
                        </svg>
            </div>
            <p><?php the_field('share', 'option'); ?></p>
        </div>
    </div>
</section>
<section>
    <div class="blog-container">
        <div class="blog-content">
            <p class="single-blog-news-items"><?php the_field('more_posts'); ?></p>
            <?php endwhile; endif; wp_reset_query(); ?>
            <div class="blog-items">
                <?php query_posts('orderby=rand&showposts=3&post_type=news_posts'); ?>
                <?php if (have_posts()) : ?>
                    <?php while (have_posts()) : the_post(); ?>
                        <?php get_template_part('inc/archivepost', get_post_format()); ?>
                    <?php endwhile; endif; ?>
            </div>
        </div>
    </div>
</section>

<?php
get_footer();
get_template_part('inc/share');
?>