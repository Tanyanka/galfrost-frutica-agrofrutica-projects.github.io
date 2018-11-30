<?php
?>
<?php
    get_header();
?>
<div class="single-wrapper">
	<div class="content">
		<div class="company-welcome">
		<h1>
			<?php the_title(); ?>
		</h1>
		</div>
	</div>
	<section class="products active">
		<?php
   			get_template_part('inc/product', 'sweets', get_post_format());
		?>
		<?php get_template_part('inc/benefits'); ?>
	</section>	
	<?php get_template_part('inc/contact'); ?>
	</div>
<?php
    get_footer();
?>
