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

    $('#text-step-1').show();
    $('.steps-container li').on('click', function(){
        $(".steps-container li").removeClass("active-step");
        $('.companies-steps-title').removeClass("active-companies-steps-title");
        $(this).addClass("active-step");
        if($(this).attr('id') == 'trivo-step-3' || $(this).attr('id') == 'trivo-step-4'){
            $('.companies-steps-title').addClass("active-companies-steps-title");
        }

    	$('.steps-image-container img').hide();
    	$('.trivo-steps').hide();

    	var id = $(this).attr('id');
    	if(id == 'trivo-step-1'){
    		$('#phone-step-1').show();
    		$('#text-step-1').fadeIn();
    	}
    	if(id == 'trivo-step-2'){
    		$('#phone-step-2').show();
    		$('#text-step-2').fadeIn();
    		$('#send-icon-1').show();
	    	$('#send-icon-2').hide();
    	}
    	if(id == 'trivo-step-3'){
    		$('#phone-step-3').show();
    		$('#text-step-3').fadeIn();
    	}
    	if(id == 'trivo-step-4'){
    		$('#phone-step-4').show();
    		$('#text-step-4').fadeIn();
    	}
    	if(id == 'trivo-step-5'){
    		$('#phone-step-5').show();
    		$('#text-step-5').fadeIn();
    	}
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