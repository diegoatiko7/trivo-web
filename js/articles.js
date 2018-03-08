$(function() {

    $("header").load("header.html", function(){
        $(".logo").addClass("logo-scrolled");
        $(".header").addClass("header-scrolled");
        $(".nav a").addClass("a-scrolled");
        $(".mobile-nav-button-container").addClass("mobile-nav-button-scrolled");
        $(".mobile-nav").addClass("mobile-nav-scrolled");
        $(".submenu").addClass("submenu-scrolled");
    });
    $("footer").load("footer.html");

    $('html').on('click', function(){
        $('.mobile-menu').hide();
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