jQuery(document).ready(function ($) {
    var $header = $('.main-header');
    var $fixedHeaderTop = $header.offset().top;
    var $windowWidth = $(window).outerWidth();
    var $logo = $('#logo-view');
    var $open = $('.animation-to');
    var $close = $('.animation-off');
    var $buttonOpenForm = $('.button-open-form');
    var $openForm = $('.open-form');
    var $buttonCloseForm = $('.button-close-form');
    var $addFooterPadding = $('#add-footer-padding');
    var $map = $('.g-contacts-map');


    function removeDocumentScroll() {
        $('body, html').addClass('overflow-hidden');
    }

    function addDocumentScroll() {
        $('body, html').removeClass('overflow-hidden');
    }
    function toggleDocumentScroll() {
        $('body, html').toggleClass('overflow-hidden');

    }
    function step1(a) {
        a.removeClass('add-padding')
    }
    function step2(a) {
        a.removeClass('active')
    }
    function step3(a) {
        a.stop().css('left', '-250%')
    }
    function closeForm() {
        if ($windowWidth < 1025) {

                $.when(addDocumentScroll()).done(step3($openForm)).done(
                    step1($('.add-padding'))
                ).done(
                    step2($openForm)
                );
        } else {
            $.when($openForm.stop().animate(step3($openForm), 500)).done(step1($('.add-padding'))).done(
                step2($openForm)
            );
        }
    }

    $openForm.mouseup(function (e) {
        if ($windowWidth < 1025) {

            var $formConteiner = $(this).find('.form-container');
            if (!$formConteiner.is(e.target) && $formConteiner.has(e.target).length === 0) {
                closeForm()
            }
        } else {
            return false;
        }
    });
    $buttonCloseForm.on('click', function (e) {
        e.preventDefault();
        closeForm();
    });
    $buttonOpenForm.on('click', function (e) {
        e.preventDefault();
        var $form = $(this).parent().find($openForm);
        $form.addClass('active');
        if ($windowWidth < 1025) {
            removeDocumentScroll();
        } else {
            var $SectionAddPadding = $form.parents('section').next('section');
            $SectionAddPadding.length ? $SectionAddPadding.addClass('add-padding') : $addFooterPadding.addClass('add-padding');
        }
        $form.stop().animate({left: '0'}, 300);
    });
    var $logoWidth;
    var $logoHeight;
    if ($windowWidth < 1025) {
        $('.g-contacts-map').remove();
    }
    $(window).on('scroll', function () {


        var windowTopScroll = $(this).scrollTop();
        if($map.length) {
            var $toMap = $map.offset().top - $(window).height();
            if (windowTopScroll > $toMap && !$map.hasClass('load') && $windowWidth > 1024 ) {
                writeGoogleMapsScript();
                $map.addClass('load');
            }
        }
        if(windowTopScroll > $fixedHeaderTop && $header.hasClass('fixed')){
            return false;
        } else if (windowTopScroll > $fixedHeaderTop) {
            $logoWidth = $logo.width();
            $logoHeight = $logo.height();
            $logo.stop().animate({marginBottom: "5px", width: '134', height: '45'}, 500);
            $header.addClass('fixed');
        } else {
            $logo.stop().animate({marginBottom: "0px", width: $logoWidth, height: $logoHeight}, 500);
            $header.removeClass('fixed');
        }

    });

    $('.toggle-nav-button').on('click',
        function (e) {
            $('html, body').toggleClass('overflow-hidden');
            e.preventDefault();
            if ($(this).hasClass('open')) {
                $header.removeClass('mob-open-menu');
                $(this).removeClass('open');
                $close.each(function (i, animate) {
                    animate.beginElement();
                });
                if ($(window).scrollTop() > $fixedHeaderTop) {
                    $logo.stop().animate({marginBottom: "5px", width: '134', height: '45'}, 500);
                }

            } else {
                $header.addClass('mob-open-menu');
                if ($(window).scrollTop() > $fixedHeaderTop) {
                    $logo.stop().animate({marginBottom: "0px", width: '162', height: '55'}, 500);
                }
                $(this).addClass('open');
                $open.each(function (i, animate) {
                    animate.beginElement();
                });

            }
        });
    $('input[type="text"], input[type="email"], input[type="tel"], textarea').focusin(function () {
        var $span = $(this).parent('span');
        if($(this).parents('form[role="search"]')) {
            $('.clear-search-button').addClass('active');
        }
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
    var clearForm = function () {
        $('.search-form-open').find('form')[0].reset();
        $('.search-form-open').find('form .placeholder').removeClass('active');
        $('.search-results').fadeOut().html('');
    };
    $('.clear-search-button').on('click', function (e) {
        e.preventDefault();
        clearForm();
    });
    $('.placeholder').on('click', function () {
        $(this).siblings('span').find('input, textarea').focus();
    });
    var productStick = $('.product-stick');
    var stickWidth = function () {
        var $currentItem = $('.product-slider-container a.active');
        var $width = $currentItem.css('width');
        var $left = $currentItem.position().left;
        productStick.css('width', $width);
        productStick.css('left', $left);
    };
    var carouselHeight = function () {
        var $height = $('.carousel-param .active').height();
        $('.carousel-param').animate({height: $height}, 500);
    };
    var carouselWidth = function () {
        var $product = $('.carousel-param .products');
        var marginRight = $('.content').css('padding-right');
        var widthMainContainer = $('.carousel-param').width();
        $product.css('width', widthMainContainer);
        //$product.css('margin-right', marginRight);
    };
    var carouselScrollLeft = function () {
      var activeSectionLeft = $('.carousel-param .active').position().left;
      $('.product-carousel-container').animate({left: -(activeSectionLeft)}, 200);
    };
    var toggleSearch = function () {
        $('.search-form-open').toggleClass('active');
    };
    $('.close-search-button').on('click', function (e) {
       e.preventDefault();
       toggleSearch();
        clearForm();
    });
    $('.search-button').on('click', function (e) {
        e.preventDefault();
        toggleSearch();

    });
    var productSlider = function () {
        $('.product-slider-container a').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                return false;
            }
            var getData = $(this).attr('data-prod-item');
            var activeSection = $('.carousel-param #product-' + getData);
            $('.carousel-param .active').removeClass('active');
            activeSection.addClass('active');
            carouselScrollLeft();
            carouselHeight();

            $('.product-slider-container a').removeClass('active');

            $(this).addClass('active');
            stickWidth();
        });
    };
    var slideDownInfo = function (x) {
        x.on('click', function (e) {
            e.preventDefault();
            if ($windowWidth < 1025) {
                $(this).parent().toggleClass('open');
                $(this).parent().find('.sm-slide').toggle(250, function () {
                    carouselHeight();
                });
            } else {
                return false;
            }
        });
    };
    var togglePopUp = function () {
        $('.return-button').toggle();
        $('.logo').toggle();
        toggleDocumentScroll();
    };
    var openPopUp = function () {
        $('.open-popup').on('click', function (e) {
            e.preventDefault();
            $(this).next('.popup-info').toggle();
            togglePopUp();
        })
    };
    var returnButton = function () {
        $('.return-button').on('click', function (e) {
            e.preventDefault();
            togglePopUp();
            $('.products-description.popup-info:visible').toggle();
        });
    };
    var scrollProductImg = function () {
        $(window).on('scroll', function () {
        var headerHeight = 70;
        var $stopBlock = $('.products.active .stop-img-block').offset().top;
        var $mainImg = $('.products.active').find('.product-img img');
        var $startBlock = $('.products.active').offset().top;
        var $imgHeight = $mainImg.height();
        var $windowTopScroll = $(this).scrollTop();

            if($windowTopScroll > $startBlock-headerHeight && $windowTopScroll < $stopBlock-$imgHeight-headerHeight) {
                var $top = $windowTopScroll - $startBlock + headerHeight;
                $mainImg.css('position', 'absolute');
                $mainImg.css('top', $top);
            } else {
                return false;
            }
        })

    };
    var tabStick = $('.tab-stick');
    var tabStickWidth = function () {
        var $currentItem = $('.company-tabs .active');
        var $width = $currentItem.css('width');
        var $left = $currentItem.position().left;
        tabStick.css('width', $width);
        tabStick.css('left', $left);
    };
    var companyTabs = function () {
      $('.company-tabs li:not(.tab-stick)').on('click', function (e) {
          e.preventDefault();
          if($(this).hasClass('active')) {
              return false;
          }
          var $tab = $(this).attr('data-company-tab');
          var $newAtiveTab = $('.company-values-container  div.' + $tab );
          $('.company-tabs li').removeClass('active');
          $(this).addClass('active');
          $('.company-values-container  div.active').removeClass('active');
          $newAtiveTab.addClass('active');
          tabStickWidth();
      })
    };
    var openShare = function () {
        $('.open-share-popup').on('click', function (e) {
            e.preventDefault();
            $('.share-popup').addClass('open');
        });
        $('.share-popup').mouseup(function (e) {
            var $formConteiner = $(this).find('.share-container');
            if (!$formConteiner.is(e.target) && $formConteiner.has(e.target).length === 0) {
                $('.share-popup').removeClass('open');
            }
        });
        $('.share-close').on('click', function (e) {
            e.preventDefault();
            $('.share-popup').removeClass('open');
        })
    };
    var singlePageSlider = function () {
      $('.single-blog-slider-navigation a').on('click', function (e) {
          if($(this).hasClass('active')){
              return false;
          }
          $('.single-blog-slider-navigation a.active').removeClass('active');
          $(this).addClass('active');
      })
    };
    var playButton = function () {
        $('.play-button').on('click', function (e) {
            e.preventDefault();
            var $video = $(this).parent().find('video');
            $(this).parent().toggleClass('active');
            if ($video.get(0).paused == false) {
                $video.get(0).pause();
            } else {
                $video.get(0).play();
            }
            });
    };

    $(window).resize(function () {
        carouselWidth();
        carouselHeight();
    });
    if($windowWidth >1024 && $('.company-certification-carouse')) {
        $('.company-certification-carousel').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            responsive: {

                1250: { items: 5 },
                1025: { items: 4}
            }
        })
    }
    $('.company-reviews-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items: 1,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    });
    $('.main-banner-slider').owlCarousel({
        loop:true,
        items: 1,
        autoplay:true,
        autoplayTimeout:5000,
        /* autoplayHoverPause:true,*/
        animateOut: 'fadeOut'
    });
    $('.blog-slider').owlCarousel({
        items:1,
        nav:true,
        loop:true,
        margin:10,
        URLhashListener:true,
        autoplayHoverPause:true,
        startPosition: 'URLHash'
    });

    var $headerHeight = $('header').height();
    // scrolling on window
    // to top right away
    if ( window.location.hash ) scroll(0,0);
    // void some browsers issue
    setTimeout( function() { scroll(0,0); }, 1);
    $(function() {

        // *only* if we have anchor on the url
        if(window.location.hash) {

            var $number = $(window.location.hash.substr(1));
            if ($.isNumeric(+$number.selector) ) {
                $('html,body').stop().animate({
                    scrollTop: $('#products').offset().top - $headerHeight
                }, 1000);
                var getData = +$number.selector;
                var activeSection = $('.carousel-param #product-' + getData);
                $('.carousel-param .active').removeClass('active');
                activeSection.addClass('active');

                carouselScrollLeft();
                carouselHeight();

                $('.product-slider-container a').removeClass('active');

                $('.product-slider-container a[data-prod-item=' + getData +']').addClass('active');
                stickWidth();
            } else {

                $('html, body').animate({
                    scrollTop: $(window.location.hash).offset().top - $headerHeight - 60

                }, 1000, 'swing');
            }
        }
    });
    var lazyScroll = function (a) {
        a.on('click', 'a', function (e) {
            $('html,body').stop().animate({
                scrollTop: $(this.hash).offset().top - $headerHeight
            }, 1000);

        e.preventDefault();
        })
    };
    lazyScroll($('#menu-item-19 .sub-menu'));
    $('#menu-main-menu a').on('click', function () {
        if ($windowWidth < 1024) {
            console.log('yes');
            $('html, body').toggleClass('overflow-hidden');
                $header.removeClass('mob-open-menu');
                $('.toggle-nav-button').removeClass('open');
                $close.each(function (i, animate) {
                    animate.beginElement();
                });
                if ($(window).scrollTop() > $fixedHeaderTop) {
                    $logo.stop().animate({marginBottom: "5px", width: '134', height: '45'}, 500);
                }
        }
    });
    $('#menu-item-22 .sub-menu a').on('click', function () {
        $('html,body').stop().animate({
            scrollTop: $('#products').offset().top - $headerHeight
        }, 1000);
        var getData = $(this).attr('href').split('#')[1];
        var activeSection = $('.carousel-param #product-' + getData);
        $('.carousel-param .active').removeClass('active');
        activeSection.addClass('active');
        carouselScrollLeft();
        carouselHeight();

        $('.product-slider-container a').removeClass('active');

        $('.product-slider-container a[data-prod-item=' + getData +']').addClass('active');
        stickWidth();
    });


    if($('.play-button').length) {
        playButton();
    }
    singlePageSlider();
    openShare();
    if(productStick.length) {
        stickWidth();
    }
    if($windowWidth < 1025 && tabStick.length) {
        tabStickWidth();
    }
    companyTabs();
    productSlider();
    carouselWidth();
    carouselHeight();
    slideDownInfo($('.info-slide .subtitle'));
    slideDownInfo($('.info-slide .title-info-slide'));
    if($windowWidth > 767 && $('.products.active').length) {
        scrollProductImg();
    }
    openPopUp();
    returnButton();

    var $buttonText;

    /* LOAD MORE BUTTON */
    $('.load-more-news').click(function(){

        var button = $(this),
            data = {
                'action': 'loadmore',
                'query': loadmore_params.posts, // that's how we get params from wp_localize_script() function
                'page' : loadmore_params.current_page
            };

        $.ajax({
            url : loadmore_params.ajaxurl, // AJAX handler
            data : data,
            type : 'POST',
            beforeSend : function ( xhr ) {
                $buttonText = button.text();
                button.text('Loading...'); // change the button text, you can also add a preloader image
            },
            success : function( data ){
                if( data ) {
                    button.text( $buttonText ); // insert new posts
                    $('.blog-items').append(data);
                    loadmore_params.current_page++;

                    if ( loadmore_params.current_page == loadmore_params.max_page )
                        button.remove(); // if last page, remove the button

                    // you can also fire the "post-load" event here if you use a plugin that requires it
                    // $( document.body ).trigger( 'post-load' );
                } else {
                    button.remove(); // if no data, remove the button as well
                }
            }
        });
    });
    $('.search-field').keypress(function(eventObject){
        var searchTerm = $(this).val();
        // if in field more than 2 charters load ajax
        if(searchTerm.length > 1){
            $.ajax({
                url : loadmore_params.ajaxurl,
                type: 'POST',
                beforeSend : function ( xhr ) {
                    $('.loading-search').fadeIn(); // change the button text, you can also add a preloader image
                },
                data:{
                    'action':'galfrost_ajax_search',
                    'term'  :searchTerm
                },
                success:function(result){
                    $('.loading-search').fadeOut(); // change the button text, you can also add a preloader image
                    $('.search-results').fadeIn().html(result);
                }
            });
        }
    });

    var $activeLang = $('.wpml-ls-current-language');
    var $firstItem = $('.wpml-ls-first-item');

    if( $activeLang !== $firstItem) {
        $activeLang.insertBefore($firstItem);
    } else {
        return false;
    }
    //text more button active

    $('.more-text-button').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).parent().find('.more-dotes').toggleClass('hide');
        $(this).parent().find('.read-more-content').toggleClass('hide');
    });
    //social buttons popup

    $('.js-share-linkedin-link').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        window.open(href, "LikedIn", "height=285,width=550,resizable=1");
    });
    $('.js-share-facebook-link').click(function(e) {
        e.preventDefault();

            var href = $(this).attr('href');
        window.open(href, "Facebook", "height=269,width=550,resizable=1");
    });

/*    $(window).on('scroll', function () {

        var $scroll = $(this).scrollTop();
        var $toMap = $map.offset().top - $(window).height();
        if ($scroll > $toMap ) {
            $('footer').appendTo($scriptMap);
        } else {
            return false;
        }

    })*/
});

