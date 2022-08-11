var currentImage;
var thumbnails, thumbnailButtons;

window.addEventListener('DOMContentLoaded', function(e) {
  currentImage = document.querySelector('.current-image');

  /**
    When Slick is initialized, retrieve the relevant DOM elements and watch for activation of the thumbnail buttons
  */
  $('.carousel .thumbnails').on('init', function(e, slick) {
    thumbnails = document.querySelectorAll('.thumbnails .thumbnail');
    thumbnailButtons = document.querySelectorAll('.thumbnails .thumbnail .thumbnail-button');

    // Ensure that all non-visible slides are impossible to reach
    hideNonVisibleSlides();
    
    // Update the large image each time a thumbnail is activated
    thumbnailButtons.forEach(function(thumbnailButton) {
      thumbnailButton.addEventListener('click', function(e) {
        activateThumbnail(thumbnailButton);
      });
    });
  });
  
  /**
    When a transition happens, make sure non-visible slides are fully hidden
  */
  $('.carousel .thumbnails').on('afterChange', function(e, slick, currentSlide) {
    hideNonVisibleSlides();
  });

  /**
    Initialize Slick Slider with recommended configuration options
  */
  $('.carousel .thumbnails').slick({
    // This removes the inappropriate tabpanel and tab roles and disables arrow key navigation.
    // NOTE: if you want to use arrow key navigation, you should implement that separately without enabling this option. The usability benefits of key navigation don't outweigh the accessibility impact of the tab implementation.
    accessibility: false,
    
    // Use highly-accessible custom elements for prev/next buttons.
    // NOTE: You can also define the elements here as strings, if you prefer
    prevArrow: document.querySelector('.carousel .previous-button'),
    nextArrow: document.querySelector('.carousel .next-button'),
    
    // Show multiple slides
    slidesToShow: 3,
    
    // Disable infinite looping
    infinite: false,
    
    // Disable mouse-based dragging
    draggable: false,
    
    // Not necessary for accessibility, but these setting breakpoints help with our embeds look nicer
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});


/**
  Fully hide non-visible thumbnails by adding tabindex="-1" when they go out of view
*/
function hideNonVisibleSlides() {
  var hiddenThumbnails = document.querySelectorAll('.thumbnails .thumbnail[aria-hidden="true"] .thumbnail-button');
  
  // Reset tabindex for all thumbnail buttons
  thumbnailButtons.forEach(function(thumbnailButton) {
    thumbnailButton.removeAttribute('tabindex');
  });

  // Make hidden thumbnail buttons impossible to reach via keyboard
  hiddenThumbnails.forEach(function(hiddenThumbnailButton) {
    hiddenThumbnailButton.setAttribute('tabindex', -1);
  });
}


/**
  Update the large current image when a thumbnail button is activated.
*/
function activateThumbnail(thumbnailButton) {
  // Swap the current image based to match the thumbnail
  // - If you'd like to use separate images, like higher-res versions, consider using the index to pick an appropriate src string from an array, or storing the URI of the higher-res image in a custom data attribute on the thumbnail.
  var newImageSrc = thumbnailButton.querySelector('img').getAttribute('src');
  var newImageAlt = thumbnailButton.querySelector('img').getAttribute('data-full-alt');
  currentImage.querySelector('img').setAttribute('src', newImageSrc);
  currentImage.querySelector('img').setAttribute('alt', newImageAlt);
  
  // Remove aria-current from any previously-activated thumbnail
  thumbnailButtons.forEach(function(button) {
    button.removeAttribute('aria-current');
  });
  
  // Indicate to screen readers which thumbnail is selected using aria-current
  thumbnailButton.setAttribute('aria-current', true);
}


$(document).ready(function() {
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count <= 0 ? 0 : count;
    
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
