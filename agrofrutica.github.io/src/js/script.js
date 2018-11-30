jQuery(document).ready(function ($) {

    // variables

    var $windowWidth = $(window).outerWidth();
    var $catousel = $('.mobile-slider');
    var $form = $('#ajax-contact');
    var $formMessages = $('#form-messages');
    var $openForm = $('.open-form');

    // mobile slider
    // 1.1 function for dots colors
    // 1.2 owl carousel v2

    function colorDots(event) {
        var $item = event.item.index;

        if($item !== 0) {
            $('.owl-dots').addClass('grey-color');
        } else {
            $('.owl-dots').removeClass('grey-color');
        }
    }

    if($windowWidth < 768) {
        $catousel.owlCarousel({
            loop:false,
            nav: false,
            items: 1,
            onDragged: colorDots
        });
    }

    // contact form

    // focus input with animated labels
    $('input[type="text"], input[type="email"], input[type="tel"], textarea').focusin(function () {
        var $span = $(this).parent('span');
        var $label = $span.siblings('.placeholder');
        $label.addClass('active');
    }).focusout(function () {
        if ($(this).val().length <= 0) {
            var $span = $(this).parent('span');
            var $label = $span.siblings('.placeholder');
            $label.removeClass('active');if($(this).parents('form[role="search"]')) {
                $('.clear-search-button').removeClass('active');
            }
        }
    });
    $('.placeholder').on('click', function () {
        $(this).siblings('span').find('input, textarea').focus();
    });

    //Set up an event listener for the contact form

    $form.submit(function(event) {
        event.preventDefault();

        var formData = $form.serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: formData,
            beforeSend: function(){
                $('.sending-message').fadeIn();
            }
        }).done(function(response) {
                $('.sending-message').fadeOut();
                $('.sendok-message').fadeIn();
            // Make sure that the formMessages div has the 'success' class.
            $formMessages.removeClass('error');
            $formMessages.addClass('success');

            // Set the message text.
            //$formMessages.fadeIn();
            //$formMessages.text(response);

            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
            $('#theme').val('');
            var $span = $('input, select, textarea').parent('span');
            var $label = $span.siblings('.placeholder');
            $label.removeClass('active');

            setTimeout(function () {
                $('.contacts-form').fadeOut();
                $formMessages.text('').fadeOut();
                $('.sendok-message').fadeOut();
            }, 3000)
        }).fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $formMessages.fadeIn();
            $formMessages.removeClass('success');
            $formMessages.addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $formMessages.text(data.responseText);
            } else {
                $formMessages.text('Щось пішло не так. Спробуйте пізніше.');
            }
        });
    });
    // set up an event listener for the button on click open pop up
    $('.g-button').on('click', function (e) {
        e.preventDefault();
        $('.contacts-form').fadeIn();
    });
    // set up an event listener for the close button on click slode pop up
    $('.button-close-form').on('click', function (e) {
        e.preventDefault();
        $openForm.fadeOut(500);
    });
    $openForm.mouseup(function (e) {
            var $formConteiner = $(this).find('.form-container');
            if (!$formConteiner.is(e.target) && $formConteiner.has(e.target).length === 0) {
                $openForm.fadeOut(500);
            }
    });
    ($windowWidth >767) ?
    $(window).bind('scroll',function(e){
        parallaxScroll();
    }): false;

    function parallaxScroll(){
        var scrolled = $(window).scrollTop();
        $('.parallax-bg1').css('top',(0-(scrolled*.10))+'px');
    }
});