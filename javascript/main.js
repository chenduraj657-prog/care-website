/**
  * isMobile
  * responsiveMenu
  * headerFixed
  * topSearch
  * detectViewport 
  * fanface
  * flatWhy  
  * counter   
  * googleMap 
  * flatTestimonials1
  * flatTestimonials2
  * progressBar
  * selectLayout
  * tabs
  * portfolioIsotope
  * CountDown
  * flatFilterPrice
  * popupdiv
  * effectmove  
  * popupGallery
  * blogCarousel
  * teamCarousel
  * goTop
  * sectionVideo    
  * responsiveVideo
  * retinaLogos 
  *  parallax
  * ajaxContactForm
  * flatAccordion
  * alertBox
  * removePreloader
*/

;(function($) {

   'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var responsiveMenu = function() {
        /* Shared CARE header: keep #mainnav in place (single-line bar; sizing in site-header.js). */
        if ( $('#header.care-main-header').length ) {
            return;
        }

        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var $navDesktop = $('#mainnav');
            var $navMobi = $('#mainnav-mobi');
            if ( !$navDesktop.length && !$navMobi.length ) {
                return;
            }

            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    if ( !$mobileMenu.length ) {
                        return;
                    }
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');

                    /*----------------------------------------------------------------------*/ 

                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');
                    if ( !$desktopMenu.length ) {
                        return;
                    }

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    }

    var headerFixed = function() {        

        if ( $('body').hasClass('header-sticky') ) {
            var hd_height = $('#header').height();         
            $(window).on('load scroll', function(){                
                if ( $(window).scrollTop() > 50 ) {
                    $('#header').addClass('downscrolled'); 
                } else {                    
                    $('#header').removeClass('downscrolled');
                }
                if( $(window).scrollTop() > 50 ) {
                    $('#header').addClass('upscrolled');                   
                } else {
                    $('#header').removeClass('upscrolled'); 
                }
            });          
        }   
    }

    var ajaxContactForm = function() {  
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.form-submit').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg == 'Success' ) {                                
                                result == 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls == 'msg-success';
                            } else {
                                result == 'Error sending email.';
                                cls == 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };   

    var lastestTweets = function() {
        if ( $().tweet ) {
            $('.latest-tweets').each(function() {
                var $this = $(this);

                $this.tweet({
                    username: $this.data('username'),
                    join_text: "auto",
                    avatar_size: null,
                    count: $this.data('number'),
                    template: "{text}{time}",
                    loading_text: "loading tweets...",
                    modpath: $this.data('modpath')      
                }); // tweet
            }); // lastest-tweets each
        }
    };

    var topSearch = function () {
        $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID !== 's' ) ) {
                $('.top-search').removeClass('show');                
            } 
        });

        $('.show-search').on('click', function(event){
            event.stopPropagation();
        });

        $('.search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.show-search').on('click', function (event) {
            if(!$('.top-search').hasClass( "show" )) {
                $('.top-search').addClass('show');  
                event.preventDefault();                
            }
                
            else
                $('.top-search').removeClass('show');
                event.preventDefault();

            if( !$('.show-search' ).hasClass( "active" ) )
                $( '.show-search' ).addClass( 'active' );
            else
                $( '.show-search' ).removeClass( 'active' );
        });   
    };

    var fanface = function(){
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.9";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    var counter = function() {       
        $('.flat-counter').on('on-appear', function() {             
            $(this).find('.numb-count').each(function() { 
                var to = parseInt( ($(this).attr('data-to')),10 ), speed = parseInt( ($(this).attr('data-speed')),10 );
                if ( $().countTo ) {
                    $(this).countTo({
                        to: to,
                        speed: speed
                    });
                }
            });
       });
    };  

    var CountDown = function() {
        var before = '<div class="square"><div class="numb">',
            text = '</div><div class="text">';
            if ($().countdown) {
                $(".countdown").countdown('2017/09/27', function(event) {
                  $(this).html(event.strftime(before + '%D' + text + '</div></div>' + before + '%H' + text + '</div></div>' + before + '%M' + text + '</div></div>' + before + '%S' + text + '</div>'));
                });
            }
    };   

    var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });
         $(window).on('load', function() {
            setTimeout(function() {
                $.waypoints('refresh');
            }, 100);
        });
    };
  
    var googleMap = function() {
        if ( $().gmap3 ) {
            $("#maps").gmap3({
                map:{
                    options:{
                        zoom: 17,
                        mapTypeId: 'coach_style',
                        mapTypeControlOptions: {
                            mapTypeIds: ['coach_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                        },
                        scrollwheel: false
                    }
                },
                getlatlng:{
                    address:  "133/2 NewYork City, US",
                    callback: function(results) {
                        if ( !results ) return;
                        $(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                        $(this).gmap3({
                            marker:{
                                latLng:results[0].geometry.location,
                                options:{
                                    icon: $('#maps').data('images')
                                }
                            }
                        });
                    }
                },
                styledmaptype:{
                    id: "coach_style",
                    options:{
                        name: "Coach Map"
                    }, 
                    styles: [
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        }
                    ]            
                },
            });
        }
    };  

    var flatTestimonials1 = function() {
        $('.flat-row').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.flat-testimonials').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: $('.flat-testimonials').data('nav'),
                    dots: $('.flat-testimonials').data('dots'),                     
                    autoplay: $('.flat-testimonials').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 2
                        },
                        1200: {
                            items: $('.flat-testimonials').data('item')
                        }
                    }
                });
            }
        });
    };

    var flatTestimonials2 = function() {
        $('.flat-row').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.flat-testimonials2').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: $('.flat-testimonials2').data('nav'),
                    dots: $('.flat-testimonials2').data('dots'),                     
                    autoplay: $('.flat-testimonials2').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        767:{
                            items: 1
                        },
                        991:{
                            items: 1
                        },
                        1200: {
                            items: $('.flat-testimonials2').data('item')
                        }
                    }
                });
            }
        });
    };

    var progressBar = function() {        
        $('.progress-bar').on('on-appear', function() {
            $(this).each(function() {
                var percent = $(this).data('percent');                
                $(this).find('.progress-animate').animate({
                    "width": percent + '%'
                }, $(this).find('.progress-animate').data('duration') );

                $(this).parent('.flat-progress').find('.perc').addClass('show').animate({
                    "width": percent + '%'
                }, $(this).find('.progress-animate').data('duration') );
            });
        });
    };

    var portfolioIsotope = function() {         
        if ( $().isotope ) {           
            var $container = $('.iso-portfolio');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.item',
                    transitionDuration: '1s'
                });
            });

            $('.portfolio-filter li').on('click',function() {                           
                var selector = $(this).find("a").attr('data-filter');
                $('.portfolio-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });

            $('.iso-portfolio .load-more a').on('click', function(e) {
                e.preventDefault();

                var el = $(this),
                    url = el.attr('href'),
                    page = parseInt(el.attr('data-page'), 10);

                el.addClass('loading').text('Loading...');

                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "html",
                    async: false,   // wait result
                    data : { page : page }
                })
                .done(function (data) {
                    if ( data !== null ) {                      
                        var newitem = $(data);
                        $container.append(newitem).isotope('appended', newitem);
                        el.removeClass('loading').text('Load more');
                        page = page + 1;
                        el.attr({'data-page': page, 'href': './ajax/p' + page + '.html'});
                    }
                })
                .fail(function () {
                    el.text('No more portfolio to load.');
                })
            });
        };
    };

    var popupdiv = function() {
            $('[data-popup-open]').on('click', function(e)  {
                var targeted_popup_class = jQuery(this).attr('data-popup-open');
                $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
         
                e.preventDefault();
            });
         
            //----- CLOSE
            $('[data-popup-close]').on('click', function(e)  {
                var targeted_popup_class = jQuery(this).attr('data-popup-close');
                $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
         
                e.preventDefault();
            });
    } 

    var flatPopupDiv = function() {
        $('.flat-row').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.flat-flexslider').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: $('.flat-flexslider').data('nav'),
                    dots: $('.flat-flexslider').data('dots'),                     
                    autoplay: $('.flat-flexslider').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 1
                        },
                        767:{
                            items: 1
                        },
                        991:{
                            items: 1
                        },
                        1200: {
                            items: $('.flat-flexslider').data('item')
                        }
                    }
                });
            }
        });
    };

    var flatWhy = function() {
        $(window).load(function() { 
            $(".flat-why[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});
            $(".flat-why[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.5, orientation: 'vertical'});
        });
    }; 

    var flatAccordion = function() {
        var args = {duration: 600};
        $('.flat-toggle .toggle-title').siblings('.toggle-content').hide();
        $('.flat-toggle .toggle-title.active').siblings('.toggle-content').show();

        $('.flat-toggle.enable .toggle-title').on('click', function() {
            $(this).closest('.flat-toggle').find('.toggle-content').slideToggle(args);
            $(this).toggleClass('active');
        }); // toggle 

        $('.flat-accordion .toggle-title').on('click', function () {
            if( !$(this).is('.active') ) {
                $(this).closest('.flat-accordion').find('.toggle-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }     
        }); // accordion
    }; 

    var tabs = function() {
        $('.flat-tabs').each(function() {
            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();
            $(this).find('.menu-tab').children('li').on('click', function(e) {  
                var liActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);

                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    var flatFilterPrice = function() {
        if( $().slider ) {
            $( ".price_slider" ).slider({
                range: true,
                min: 607,
                max: 1140,
                values: [ 610, 980 ],
                slide: function( event, ui ) {
                    $( ".price_label > input " ).val( "$" + ui.values[ 0 ] + "  - $" + ui.values[ 1 ] );
                    }
            });

            $( ".price_label > input " ).val( "$" + $( ".price_slider" ).slider( "values", 0 ) +
            "  -  $" + $( ".price_slider" ).slider( "values", 1 ) );
            $( ".ui-slider-handle").append("<span class='shadow'></span>");
        }
    };

    var VideoPopup =  function() {
        $(".fancybox").on("click", function(){
            $.fancybox({
              href: this.href,
              type: $(this).data("type")
            }); // fancybox
            return false   
        }); // on
    }

    var swClick = function () {
        function activeLayout () {
            $(".switcher-container" ).on( "click", "a.sw-light", function() {
                $(this).toggleClass( "active" );
                $('body').addClass('home-boxed');  
                $('body').css({'background': '#f6f6f6' });                
                $('.sw-pattern.pattern').css ({ "top": "100%", "opacity": 1, "z-index": "10"});
            }).on( "click", "a.sw-dark", function() {
                $('.sw-pattern.pattern').css ({ "top": "98%", "opacity": 0, "z-index": "-1"});
                $(this).removeClass('active').addClass('active');
                $('body').removeClass('home-boxed');
                $('body').css({'background': '#fff' });
                return false;
            })       
        }        

        function activePattern () {
            $('.sw-pattern').on('click', function () {
                $('.sw-pattern.pattern a').removeClass('current');
                $(this).addClass('current');
                $('body').css({'background': 'url("' + $(this).data('image') + '")', 'background-size' : '30px 30px', 'background-repeat': 'repeat' });
                return false
            })
        }

        activeLayout(); 
        activePattern();
    } 
    
    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 500 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        }); 

        $('.go-top').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };   

    var retinaLogos = function() {
      var retina = window.devicePixelRatio > 1 ? true : false;
        if(retina) {
            $('.header .logo').find('img').attr({src:'./images/logo@2x.png',width:'150',height:'20'});   
        }
    };    
    
    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax1').parallax("50%", 0.1); 
            $('.parallax2').parallax("50%", 0.1);
            $('.parallax3').parallax("50%", 0.1);   
            $('.parallax4').parallax("50%", 0.1); 
            $('.parallax5').parallax("50%", 0.1);  
            $('.parallax6').parallax("50%", 0.1); 
            $('.parallax7').parallax("50%", 0.5);
            $('.parallax8').parallax("50%", 0.1);
            $('.parallax9').parallax("50%", 0.1);          
        }
    };

    var popupGallery = function () {
        $(".popup-gallery").magnificPopup({
            type: "image",
            tLoading: "Loading image #%curr%...",
            removalDelay: 600,
            mainClass: "my-mfp-slide-bottom",
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [ 0, 1 ]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });
    }

    var blogCarousel = function() {
        $('.blog-carousel').each(function(){            
            if ( $().owlCarousel ) {
                $(this).find('.post-shortcode').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: false,
                    dots: false, 
                    auto:true,
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        }, 
                        1200:{
                            items: 3
                        }               
                    }
                });
            }            
        });
    }; 

    var teamCarousel = function() {
        $('.team-carousel').each(function(){            
            if ( $().owlCarousel ) {
                $(this).find('.team-shortcode').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: false,
                    dots: false, 
                    auto:true,
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 4
                        }, 
                        1200:{
                            items: 4
                        }               
                    }
                });
            }            
        });
    }; 

    var removePreloader = function() { 
        $(window).on( 'load', function(){
          $('.loading-overlay').delay(300).fadeOut('slow',function(){
            $(this).remove();
          });    

      });
         
    };

    var ajaxSubscribe = {
        obj: {
            subscribeEmail    : $('#subscribe-email'),
            subscribeButton   : $('#subscribe-button'),
            subscribeMsg      : $('#subscribe-msg'),
            subscribeContent  : $("#subscribe-content"),
            dataMailchimp     : $('#subscribe-form').attr('data-mailchimp'),
            success_message   : '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message   : '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError       : '<div class="notification_error">{msg}</div>',
            noticeInfo        : '<div class="notification_error">{msg}</div>',
            basicAction       : 'mail/subscribe.php',
            mailChimpAction   : 'mail/subscribe-mailchimp.php'
        },

        eventLoad: function() {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on('click', function() {
                if ( window.ajaxCalling ) return;
                var isMailchimp = objUse.dataMailchimp === 'true';

                if ( isMailchimp ) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html('').hide();
            $.ajax({
                url: action,
                type: 'POST',
                dataType: 'json',
                data: {
                   subscribeEmail: objUse.subscribeEmail.val()
                },
                success: function (responseData, textStatus, jqXHR) {
                    if ( responseData.status ) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email is required.</strong>'));
                                break;
                            case "email-err":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email invalid.</strong>'));
                                break;
                            case "duplicate":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email is duplicate.</strong>'));
                                break;
                            case "filewrite":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! <strong>Mail list file is open.</strong>'));
                                break;
                            case "undefined":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! <strong>undefined error.</strong>'));
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Connection error');
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                }
            });
        }
    };

    var runHeaderDependent = function() {
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
             headerFixed();
        }
        responsiveMenu();
        topSearch();
    };

   	// Dom Ready
	$(function() {
        var restInit = function() {
            detectViewport();
            fanface();
            flatWhy();
            counter();
            googleMap();
            flatTestimonials1();
            flatTestimonials2();
            progressBar();
            ajaxSubscribe.eventLoad();
            tabs();
            portfolioIsotope();
            CountDown();
            flatFilterPrice();
            popupdiv();
            flatPopupDiv();
            popupGallery();
            swClick();
            goTop();
            VideoPopup();
            //retinaLogos();
            parallax();
            ajaxContactForm();
            flatAccordion();
            blogCarousel();
            teamCarousel();
            lastestTweets();
            removePreloader();
        };

        if ( $('#care-site-header-mount').length ) {
            var headerInitDone = false;
            var runHeaderOnce = function() {
                if ( headerInitDone ) {
                    return;
                }
                headerInitDone = true;
                runHeaderDependent();
                $(window).trigger('resize');
            };
            $(document).one('care:header-ready', runHeaderOnce);
            setTimeout(runHeaderOnce, 12000);
        } else {
            runHeaderDependent();
        }

        restInit();
   	});

})(jQuery);