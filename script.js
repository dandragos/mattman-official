window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("main-header").style.backgroundColor = "black";
  } else {
    document.getElementById("main-header").style.backgroundColor = "transparent";
  }
}


document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('.menu').style.display = 'block';
});

document.querySelector('.menu').addEventListener('click', () => {
  document.querySelector('.menu').style.display = 'none';
});







var $slider = $('.slideshow .slider'),
  maxItems = $('.item', $slider).length,
  dragging = false,
  tracking,
  rightTracking;

$sliderRight = $('.slideshow').clone().addClass('slideshow-right').appendTo($('.split-slideshow'));

rightItems = $('.item', $sliderRight).toArray();
reverseItems = rightItems.reverse();
$('.slider', $sliderRight).html('');
for (i = 0; i < maxItems; i++) {
  $(reverseItems[i]).appendTo($('.slider', $sliderRight));
}

$slider.addClass('slideshow-left');
$('.slideshow-left').slick({
  vertical: true,
  verticalSwiping: true,
  arrows: false,
  infinite: true,
  dots: true,
  speed: 1000,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {

  if (currentSlide > nextSlide && nextSlide == 0 && currentSlide == maxItems - 1) {
    $('.slideshow-right .slider').slick('slickGoTo', -1);
    $('.slideshow-text').slick('slickGoTo', maxItems);
  } else if (currentSlide < nextSlide && currentSlide == 0 && nextSlide == maxItems - 1) {
    $('.slideshow-right .slider').slick('slickGoTo', maxItems);
    $('.slideshow-text').slick('slickGoTo', -1);
  } else {
    $('.slideshow-right .slider').slick('slickGoTo', maxItems - 1 - nextSlide);
    $('.slideshow-text').slick('slickGoTo', nextSlide);
  }
// }).on("mousewheel", function(event) {
//   event.preventDefault();
//   if (event.deltaX > 0 || event.deltaY < 0) {
//     $(this).slick('slickNext');
//   } else if (event.deltaX < 0 || event.deltaY > 0) {
//     $(this).slick('slickPrev');
//   };


}).on('mousedown touchstart', function(){
  dragging = true;
  tracking = $('.slick-track', $slider).css('transform');
  tracking = parseInt(tracking.split(',')[5]);
  rightTracking = $('.slideshow-right .slick-track').css('transform');
  rightTracking = parseInt(rightTracking.split(',')[5]);
}).on('mousemove touchmove', function(){
  if (dragging) {
    newTracking = $('.slideshow-left .slick-track').css('transform');
    newTracking = parseInt(newTracking.split(',')[5]);
    diffTracking = newTracking - tracking;
    $('.slideshow-right .slick-track').css({'transform': 'matrix(1, 0, 0, 1, 0, ' + (rightTracking - diffTracking) + ')'});
  }
}).on('mouseleave touchend mouseup', function(){
  dragging = false;
});

$('.slideshow-right .slider').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: true,
  speed: 950,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
  initialSlide: maxItems - 1
});
$('.slideshow-text').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: true,
  speed: 900,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
});


setInterval(function(){
  $('.slideshow-left .slider').slick('slickNext');
}, 5000);



// ss-container

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


// document.addEventListener('DOMContentLoaded', function() {
//   var thumbnails = document.querySelectorAll('.thumbnail');
//   var iframes = document.querySelectorAll('.video-iframe');

//   thumbnails.forEach(function(thumbnail, index) {
//     thumbnail.addEventListener('click', function() {
//       iframes.forEach(function(iframe) {
//         iframe.style.display = 'none';
//       });
//       iframes[index].style.display = 'block';
//     });
//   });
// });



// Functie care verifica daca un element este in viewport
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    return (
        rect.top >= -windowHeight / 2 &&
        rect.bottom <= (windowHeight + windowHeight / 2)
    );
}

function isElementInViewport2(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  var elementHeight = rect.bottom - rect.top;
  var visibleThreshold = elementHeight * 1.2; // 20% din înălțimea elementului

  return (
    rect.top >= -visibleThreshold &&
    rect.bottom <= (windowHeight + visibleThreshold)
  );
}


// Functie care afiseaza elementele grid-item cand sunt in viewport
function showGridItems() {
  var gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(function(item) {
      if (isElementInViewport(item)) {
          item.classList.add('show');
      }
  });
}

// Afiseaza elementele grid-item cand se deruleaza pagina
window.addEventListener('scroll', showGridItems);
window.addEventListener('load', showGridItems); // Afiseaza elementele cand pagina este incarcata pentru cazul in care div-ul este in viewport initial


function showAbout() {
  var aboutUs = document.querySelectorAll('.about-us');
  aboutUs.forEach(function(item) {
      if (isElementInViewport(item)) {
          item.classList.add('show');
      }
  });
}

// Afiseaza elementele grid-item cand se deruleaza pagina
window.addEventListener('scroll', showAbout);
window.addEventListener('load', showAbout); // Afiseaza elementele cand pagina este incarcata pentru cazul in care div-ul este in viewport initial


function showWork() {
  var work = document.querySelectorAll('.ss-container');
  work.forEach(function(item) {
      if (isElementInViewport2(item)) {
          item.classList.add('show');
      }
  });
}

// Afiseaza elementele grid-item cand se deruleaza pagina
window.addEventListener('scroll', showWork);
window.addEventListener('load', showWork); // Afiseaza elementele cand pagina este incarcata pentru cazul in care div-ul este in viewport initial

