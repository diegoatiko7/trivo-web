$(function () {

	$("header").load("real_state/header.html", function(){
		scrolled();
		if (window.location.hash) {
			gotoanchor(window.location.hash);
		}
	});

  	$('html').on('click', function(){
  		$('.mobile-menu').hide();
  	});
  	
	$(window).on("scroll", function () {
		scrolled();
	});

	$(".icon-container").on('click', function () {
		$(".icon-container").removeClass("active-icon");
		$(this).addClass("active-icon");
		$('.phone-info').hide();

		var id = $(this).attr('id');
		if (id == 'phone-action-1') {
			$('#phone-info-1').show();
			$('.helper-2').fadeIn();
			$('.helper-3').fadeOut();
		}
		if (id == 'phone-action-2') {
			$('#phone-info-2').show();
			$('.helper-2').fadeOut();
			$('.helper-3').fadeIn();
		}
		if (id == 'phone-action-3') {
			$('#phone-info-3').show();
			$('.helper-2').fadeOut();
			$('.helper-3').fadeOut();
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

	//var host = "http://localhost/netbroker/";
    //var host = "http://dev.trivo.co/";
    var host = "https://trivo.co/";

    var api_key = 'MTU2NDJkYzcxZjkwNTk4NjdlNjVlYWRjZTI5Zjdl';

	$.ajax({
        headers: {
            'api-key': api_key,
        },
        type: "GET",
        url: host+"api/api/public_general_data",
    })
    .done(function(data) {
    	$('#connections').html(data.connections);
    	$('#active_users').html(data.active_users);
    	$('#total_paid').html('$'+data.total_paid);
    	$('#bills_total').html('$'+data.bills_total);
    	$('#active_vendors').html(data.active_vendors);
    });

	$('.testimonies').slick({
		dots: true,
		arrows: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		      }
		    }
		]
	});

	$('.companies').slick({
		dots: false,
		arrows: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: '<div class="prev-arrow"><i class="fa fa-chevron-left"></i></div>',
		nextArrow: '<div class="next-arrow"><i class="fa fa-chevron-right"></i></div>',
		autoplay: true,
		autoplaySpeed: 2500,
		responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		      }
		    }
		]
	});

	$('.alert').hide();
	$('.loading-icon').hide();
	$('#contact_form').submit(function (e) {
		$('.loading-icon').show();
		e.preventDefault();
		var request = $.ajax({
			url: "php/mail.php",
			method: "POST",
			data: { data: $(this).serialize() },
			dataType: 'json',
			success: function (data) {
				if (data[0] == 'error') {
					$('.alert').removeClass('alert-success');
					$('.alert').addClass('alert-danger');
				}
				$('.loading-icon').hide();
				$('#contact_form')[0].reset();
				$('.alert').text(data[1]);
				$('.alert').fadeIn();
				setTimeout(function () {
					$('.alert').fadeOut('slow');
				}, 5000);
			}
		});
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

	var map;
	function initMap() {
		var coord = { lat: -0.194280, lng: -78.492042 };
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: -0.194280, lng: -78.492042 },
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			draggable: true,
			zoomControl: false,
			scrollwheel: false,
			disableDoubleClickZoom: false,
			styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
		});

		var marker = new google.maps.Marker({
			position: { lat: -0.191477, lng: -78.483325 },
			map: map,
			icon: 'img/pin.png'
		});

	}
	initMap();

	function gotoanchor(element) {
		$("html, body").animate({ scrollTop: $(element).offset().top }, 1);
		return true;
	};
});