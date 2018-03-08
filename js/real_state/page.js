$(function() {

    $("header").load("real_state/header.html", function(){
        scrolled();
    });
    $("footer").load("footer.html");

    $('.mobile-nav-button').on('click', function(e){
        e.stopPropagation();
        $('.mobile-menu').slideToggle();
    });

    $('html').on('click', function(){
        $('.mobile-menu').hide();
    });

    $(window).on("scroll", function() {
        scrolled();
    });

    $('.register-button').on('click', function(){
        var id = $(this).attr('id');
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i))
        {   
            if(navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i))
            {
                window.location.href = "https://itunes.apple.com/us/app/trivo/id1156095919?l=es&mt=8";
            }
            if(navigator.userAgent.match(/Android/i)){
                window.location.href = "https://play.google.com/store/apps/details?id=com.provedatos.trivo&hl=en";
            }
        }
        else{
            if(id == 'sign_in_button'){
                window.location.href = "https://www.trivo.co/#/login";
            }
            if(id == 'sign_up_button'){
                window.location.href = "https://www.trivo.co/#/broker_register";
            }
        }
    });

    function scrolled() {
        if ($(window).scrollTop() > 5) {
            $(".header").addClass("header-scrolled");
            $(".nav a").addClass("a-scrolled");
            $(".logo").addClass("logo-scrolled");
            $(".mobile-nav-button-container").addClass("mobile-nav-button-scrolled");
            $(".mobile-nav").addClass("mobile-nav-scrolled");
            $(".submenu").addClass("submenu-scrolled");
        } else {
            $(".header").removeClass("header-scrolled");
            $(".nav a").removeClass("a-scrolled");
            $(".logo").removeClass("logo-scrolled");
            $(".mobile-nav-button-container").removeClass("mobile-nav-button-scrolled");
            $(".mobile-nav").removeClass("mobile-nav-scrolled");
            $(".submenu").removeClass("submenu-scrolled");
        }
    }
});