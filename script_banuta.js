

function scrollFooter(scrollY, heightFooter)
{
    console.log(scrollY);
    console.log(heightFooter);

    if(scrollY >= heightFooter)
    {
        $('footer').css({
            'bottom' : '0px'
        });
    }
    else
    {
        $('footer').css({
            'bottom' : '-' + heightFooter + 'px'
        });
    }
}

$(window).load(function(){
    var windowHeight        = $(window).height(),
        footerHeight        = $('footer').height(),
        heightDocument      = (windowHeight) + ($('.content').height()) + ($('footer').height()) - 20;

    // Definindo o tamanho do elemento pra animar
    $('#scroll-animate, #scroll-animate-main').css({
        'height' :  heightDocument + 'px'
    });

    // Definindo o tamanho dos elementos header e conteúdo
    $('header').css({
        'height' : windowHeight + 'px',
        'line-height' : windowHeight + 'px'
    });

    $('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
    window.onscroll = function(){
        var scroll = window.scrollY;

        $('#scroll-animate-main').css({
            'top' : '-' + scroll + 'px'
        });
        
        $('header').css({
            'background-position-y' : 50 - (scroll * 100 / heightDocument) + '%'
        });

        scrollFooter(scroll, footerHeight);
    }
});






$(document).ready(function() {
    $(".slider-youtube iframe").each(function (idx) {
    $(this).addClass("data-idx-" + idx).data("idx", idx);
});

    function getPlayer (iframe, onPlayerReady, clonned) {
        var $iframe = $(iframe);
    if ($iframe.data((clonned ? "clonned-" : "") + "player")) {
        var isReady = $iframe.data((clonned ? "clonned-" : "") + "player-ready");
      if (isReady) {
          onPlayerReady && onPlayerReady($iframe.data((clonned ? "clonned-" : "") + "player"));
      }        	
        return player;
    }
    else {
        var player = new YT.Player($iframe.get(0), {
        events: {
          'onReady': function () {
              $iframe.data((clonned ? "clonned-" : "") + "player-ready", true);
            onPlayerReady && onPlayerReady(player);
          }
        }
      });        
      $iframe.data((clonned ? "clonned-" : "") + "player", player);
      return player;
    }    		
}

//on first load, play the video
$(".slider-youtube").on('init', function(event, slick, currentSlide) {
    var currentSlide, player, command;
    currentSlide = $(slick.$slider).find(".slick-current");        
    getPlayer(currentSlide.find("iframe"), function (player) {
        player.playVideo();
    });
});

//when new slide displays, play the video
$(".slider-youtube").on("afterChange", function(event, slick) {
    var currentSlide;
    currentSlide = $(slick.$slider).find(".slick-current");
    getPlayer(currentSlide.find("iframe"), function (player) {
        player.playVideo();
    });
});

  function updateClonnedFrames () {
    frames = $(".slider-youtube").find(".slick-slide").not(".slick-cloned").find("iframe");
  frames.each(function () {
      var frame = $(this);
      var idx = frame.data("idx");
      clonedFrames = $(".slider-youtube").find(".slick-cloned .data-idx-" + idx);
    console.log("clonedFrames", frame, idx, clonedFrames);
    clonedFrames.each(function () {
        var clonnedFrame = this;
        getPlayer(frame[0], function (player) {
        getPlayer(clonnedFrame, function (clonedPlayer) {         
          console.log("clonnedPlayer", clonedPlayer);
          clonedPlayer.playVideo();  
          clonedPlayer.seekTo(player.getCurrentTime(), true);
          setTimeout(function () {
              clonedPlayer.pauseVideo();         
          }, 0);              
        }, true);
      });
    });        
  });    	    	
}
  
//reset iframe of non current slide
$(".slider-youtube").on('beforeChange', function(event, slick, currentSlide) {
    var currentSlide, iframe, clonedFrame;
    currentSlide = $(slick.$slider).find(".slick-current");
    iframe = currentSlide.find("iframe");        
    getPlayer(iframe, function (player) {   
        player.pauseVideo();
      updateClonnedFrames();
    });          
});

//start the slider
$('.slider-youtube').slick({
    slidesToShow: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '50px',
    infinite: true,
    variableWidth: true
});
});




var slides = document.querySelectorAll('.slide');
var currentSlide = 0;

function showSlide(n) {
  slides[currentSlide].style.display = 'none';
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].style.display = 'block';
}

function changeSlide(n) {
  showSlide(currentSlide + n);
}

setInterval(function() {
  changeSlide(1);
}, 25000); // schimbă slide-ul la fiecare 5 secunde