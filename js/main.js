$(document).ready(function() {    
    $(window).scroll(function() {
        let position = $(this).scrollTop();
        let windowsize = $(window).width();
        if (position >= 106 && windowsize > 768 ) {
            $('nav').addClass('fixed-menu');
            $('.nav-list').addClass('.fixed-menu');
            $('.nav-link').addClass('.fixed-menu');
            $('.logo-img').addClass('.fixed-menu');
        } else {
            $('nav').removeClass('fixed-menu');
            $('.nav-list').removeClass('fixed-menu');
            $('.nav-link').removeClass('fixed-menu');
            $('.logo-img').removeClass('fixed-menu');
        }
    });
    
    $(window).resize(function() {
        let windowsize = $(window).width();
        if (windowsize > 768) {
          $('.nav-list').css('display', 'inherit'); 
        } else {
          $('.nav-list').css('display', 'none'); 
        }
    });
    
    $('nav a[href*="#"]').on('click', function() {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
            }, 900);
    });
    
   $('.menu-toggler').click(function(){
       $(this).toggleClass('open');
       $('.nav-list').stop().slideToggle(300); 
   }); 
    
    $('nav .nav-list').on('click', function() {
        $('.menu-toggler').removeClass('open');
        let windowsize = $(window).width();
        if (windowsize <= 768) {
          $('.nav-list').stop().slideToggle(300);
        }
    });
    
});