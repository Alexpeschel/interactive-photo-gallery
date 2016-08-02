document.addEventListener('DOMContentLoaded', function() {

  var galleryItems = document.querySelectorAll('.gallery-item');
  var img = document.getElementById('js-lightbox-img');
  var lightbox = document.getElementById('js-lightbox');
  var lightboxBg = document.getElementById('js-lightbox-bg');
  var lightboxText = document.getElementById('js-lightbox-text');
  var prev = document.getElementById('js-prev');
  var next = document.getElementById('js-next');
  var searchInput = document.getElementById('js-search-input');
  var imageCount = 1;
  var currentImage;
  var imgSrc;
  var prevImage;
  var nextImage;
  var searchInputValue;


  function previousItem() {
    if(currentImage == 1) {
      currentImage = galleryItems.length;
    } else {
      currentImage = currentImage - 1;
    }
    prevImage = currentImage;
    img.src = document.getElementById(prevImage).dataset.src;
    lightboxText.innerHTML = document.getElementById(prevImage).dataset.text;
  }

  function nextItem() {
    if(currentImage == galleryItems.length) {
      currentImage = 1;
    } else {
      currentImage = parseInt(currentImage) + 1;
    }
    nextImage = currentImage;
    img.src = document.getElementById(nextImage).dataset.src;
    lightboxText.innerHTML = document.getElementById(nextImage).dataset.text;
  }

  [].forEach.call( galleryItems, function(el) {
    el.id = imageCount;
    imageCount++;
    el.addEventListener('click', function() {
      lightbox.classList.add('visible');
      currentImage = this.id;
      imgSrc = this.dataset.src;
      img.src = imgSrc;
      lightboxText.innerHTML = this.dataset.text;
      document.onkeydown = checkKey;

      function checkKey(e) {

          e = e || window.event;

          if (e.keyCode == '37') {
            // left arrow
            previousItem();

          }
          else if (e.keyCode == '39') {
             // right arrow
             nextItem();
          }

      }
   }, false);
  });

  lightboxBg.addEventListener('click', function() {
    lightbox.classList.remove('visible');
  }, false);


  prev.addEventListener('click', function() {
    previousItem();
  }, false);

  next.addEventListener('click', function() {
    nextItem();
  }, false);

  // SEARCH
  searchInput.addEventListener('keyup', function() {
    searchInputValue = searchInput.value;
    [].forEach.call( galleryItems, function(el) {
      console.log(searchInputValue);
      if(el.dataset.text.search(searchInputValue) < 0) {
        el.classList.add('hide');
      } else {
        el.classList.remove('hide');
      }
      console.log(el.dataset.text.search(searchInputValue));
    });
  }, false);
});
