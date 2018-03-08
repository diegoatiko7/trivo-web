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

    $(".category_campaigns").hide();
    $(".all_categories").hide();

    $(".category_campaigns > .section-title").hide();
    $(".all_categories > .section-title").hide();
    $(".categories-back-arrow").hide();
    $(".back-arrow").hide();
    
    loadMainCategories();

    $(".categories-back-arrow").on("click", function(){
        $(".main-categories-content").show();
        $(".all_categories").hide();
        $(".categories-grid").empty();
        $(".all_categories > .section-title").hide();
        $(".categories-back-arrow").hide();
        $('.categories-grid').masonry('destroy');

    });

    $(".back-arrow").on("click", function(){
        $(".categories-content").show();
        $(".category_campaigns").hide();
        $(".grid").empty();
        $(".category_campaigns > .section-title").hide();
        $(".back-arrow").hide();
        $('.grid').masonry('destroy');
    });

    function loadMainCategories() {
        //var host = "http://localhost/netbroker/";
        //var host = "http://dev.trivo.co/";
        var host = "https://trivo.co/";

        var api_key = 'MTU2NDJkYzcxZjkwNTk4NjdlNjVlYWRjZTI5Zjdl';

        var url_string = window.location.href; 
        var url = new URL(url_string);
        var ref = url.searchParams.get("val");

        if(ref == 1 ){
            loadCategories(host, api_key, ref, 'trivo Tecnología');
        } else if(ref == 2){
            loadCategories(host, api_key, ref, 'trivo Inmobilaria');
        } else if(ref == 3){
            loadCategories(host, api_key, ref, 'trivo Vehículos');
        } else if(ref == 4){
            loadCategories(host, api_key, ref, 'trivo Seguros');
        } 
    }

    function loadCategories(host, api_key, element, name) {
        var id = element;
        var category_name = name;
        $(".all_categories").show();

        $.ajax({
            headers: {
                'api-key': api_key,
            },
            type: "GET",
            url: host+"api/api/public_categories?main_category_id="+id
        })
        .done(function(data) {
            $.each( data, function( key, value ) {
                var category = '<div class="col-lg-4 col-sm-6 no-padding grid-item-2"><div id="'+value.id+'" class="campaign-element"><div class="row"><div class="col-xs-12"><img src="'+host+value.category_img+'" alt="trivo categoria"></div></div><div class="row"><div class="company col-xs-12">'+value.name+'</div></div><div class="row"><div class="prize-range col-xs-12 text-right"><span>Gana entre:</span>$'+value.min_prize+' - $'+value.max_prize+'</div></div></div></div>';
                $(".categories-grid").append(category);
            });

            $('.categories-grid').imagesLoaded( function () {
                $('.categories-grid').masonry({
                    columnWidth: '.grid-item-2',
                    itemSelector: '.grid-item-2'
                });   
            });

            $(".campaign-element").on("click", function(){
                var element = this;
                loadCampaigns(host, api_key, element);
            });

            $(".main-categories-content").slideUp(300);
            $('html, body').animate({
                scrollTop: $(".campaign-content").offset().top - 215
            }, 300);
            $(".all_categories > .section-title").html(category_name);
            $(".all_categories > .section-title").show();
            $(".categories-back-arrow").show();
        });
    }

    function loadCampaigns(host, api_key, element) {
        var id = $(element).attr('id');
        var category_name = $(element).find('.company').text();
        $(".category_campaigns").show();

        $.ajax({
            headers: {
                'api-key': api_key,
            },
            type: "GET",
            url: host+"api/api/public_campaigns?category_id="+id
        })
        .done(function(campaigns) {

            $.each( campaigns, function( key, camp ) {
                var short_description = camp.description.substring(0, 120) + "...";
                var campaign = '<div class="grid-item col-xs-12 col-sm-6 col-lg-4 no-padding"><div id="'+camp.id+'" class="campaign-block campaign-element"><div class="row"><div class="col-xs-12"><img src="'+host+camp.img_path+'"></div></div><div class="row"><div class="company col-xs-12">'+camp.vendor_name+'</div></div><div class="row"><div class="prize-range col-xs-12 text-right"><span>Gana entre:</span>$'+camp.prize_from+' - $'+camp.prize_to+'</div></div><hr/><div class="row"><div class="campaign-title col-xs-12">'+camp.campaign_name+'</div></div><div class="row"><div class="campaign-description col-xs-12">'+short_description+'</div></div></div></div>';
                $(".grid").append(campaign);
            });

            $('.grid').imagesLoaded( function () {
                $('.grid').masonry({
                    columnWidth: '.grid-item',
                    itemSelector: '.grid-item'
                });   
            });

            $('.campaign-block').on('click', function(){
                $('.modal-back-icon').hide();
                $('.modal-title').show();
                $('.campaing-detail').show();
                $('.register-modal').hide();
                $('.modal-footer').show();

                var id = $(this).attr('id');
                var active_campaign = {};
                $.each( campaigns, function( key, camp ) {
                    if(camp.id == id){
                        active_campaign = camp;
                        return false;
                    }
                });

                $(".modal-title").text(active_campaign.campaign_name);
                $(".modal-vendor").text(active_campaign.vendor_name);
                $(".modal-link-href").attr("href", "http://"+active_campaign.link);
                $(".modal-link").text(active_campaign.link);
                $(".modal-prize").text(active_campaign.prize + "%");
                $(".modal-prize-from").text("$" + active_campaign.prize_from);
                $(".modal-prize-to").text("$" + active_campaign.prize_to);
                $(".modal-description").text(active_campaign.description);
                $('#campaign_modal').modal();

                $('.modal_next_button').on('click', function(){
                    $('.modal-back-icon').show();
                    $('.modal-title').hide();
                    $('.campaing-detail').hide();
                    $('.register-modal').show();
                    $('.modal-footer').hide();
                });

                $('.modal-back-icon').on('click', function(){
                    $('.modal-back-icon').hide();
                    $('.modal-title').show();
                    $('.campaing-detail').show();
                    $('.register-modal').hide();
                    $('.modal-footer').show();
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
            });

            $(".categories-content").slideUp(300);
            $('html, body').animate({
                scrollTop: $(".campaign-content").offset().top - 215
            }, 300);
            $(".category_campaigns > .section-title").html(category_name);
            $(".category_campaigns > .section-title").show();
            $(".back-arrow").show();
        });
    }

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