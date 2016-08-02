document.addEventListener('DOMContentLoaded', function() {

  var galleryItems = document.querySelectorAll('.gallery-item');
  var container = document.getElementById('js-lightbox-figure');
  var closeButton = document.getElementById('js-lightbox-close');
  var img = document.getElementById('js-lightbox-img');
  var iframe = document.getElementById('js-lightbox-iframe');
  var iframeContainer = document.getElementById('js-lightbox-iframe-container');
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
  var iframeNode;
  var imgNode;

  // check if source is a Youtube Video
  // if true remove image and create iframe
  function isVideo(src) {
    img = document.getElementById('js-lightbox-img')
    if(container.contains(img)) {
      if(src.indexOf("youtube") > 0) {
        iframeContainerNode = document.createElement("div");
        iframeContainerNode.setAttribute("id", "js-lightbox-iframe-container");
        iframeContainerNode.setAttribute("class", "lightbox-iframe-container");
        iframeNode = document.createElement("iframe");
        iframeNode.setAttribute("id", "js-lightbox-iframe");
        iframeNode.setAttribute("class", "lightbox-iframe");
        iframeNode.setAttribute("src", src);
        iframeNode.setAttribute("frameborder", "0");
        iframeNode.setAttribute("allowfullscreen", "allowfullscreen");
        iframeContainerNode.appendChild(iframeNode);
        container.replaceChild(iframeContainerNode, img);
      } else {
        img.src = src;
      }
    }
    // else remove iframe and create image
    else {
      iframe = document.getElementById('js-lightbox-iframe');
      iframeContainer = document.getElementById('js-lightbox-iframe-container');
      if(src.indexOf("youtube") > 0) {
        iframe.src = src;
      } else {
        imgNode = document.createElement("img");
        imgNode.setAttribute("id", "js-lightbox-img");
        imgNode.setAttribute("class", "lightbox-img");
        imgNode.setAttribute("src", src);
        imgNode.setAttribute("allowfullscreen", "allowfullscreen");
        container.replaceChild(imgNode, iframeContainer);
      }
    }
  }

  // get previous item
  function previousItem() {
    if(currentImage == 1) {
      currentImage = galleryItems.length;
    } else {
      currentImage = currentImage - 1;
    }
    prevImage = currentImage;
    imgSrc = document.getElementById(prevImage).dataset.src
    console.log(imgSrc);
    isVideo(imgSrc);
    lightboxText.innerHTML = document.getElementById(prevImage).dataset.text;
  }
  // get next item
  function nextItem() {
    if(currentImage == galleryItems.length) {
      currentImage = 1;
    } else {
      currentImage = parseInt(currentImage) + 1;
    }
    nextImage = currentImage;
    imgSrc = document.getElementById(nextImage).dataset.src
    isVideo(imgSrc);
    lightboxText.innerHTML = document.getElementById(nextImage).dataset.text;
  }
  // add Eventlistener to items
  [].forEach.call( galleryItems, function(el) {
    el.id = imageCount;
    imageCount++;
    el.addEventListener('click', function() {
      lightbox.classList.add('visible');
      currentImage = this.id;
      imgSrc = this.dataset.src;
      isVideo(imgSrc);
      // img.src = imgSrc;
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

  // close lightbox
  lightboxBg.addEventListener('click', function() {
    lightbox.classList.remove('visible');
  }, false);
  closeButton.addEventListener('click', function() {
    lightbox.classList.remove('visible');
  }, false);

  // click previous button
  prev.addEventListener('click', function() {
    previousItem();
  }, false);
  // click next button
  next.addEventListener('click', function() {
    nextItem();
  }, false);

  // SEARCH
  searchInput.addEventListener('keyup', function() {
    searchInputValue = searchInput.value;
    [].forEach.call( galleryItems, function(el) {
      if(el.dataset.text.search(new RegExp(searchInputValue, "i")) == -1) {
        el.classList.add('hide');
      } else {
        el.classList.remove('hide');
      }
    });
  }, false);
});
