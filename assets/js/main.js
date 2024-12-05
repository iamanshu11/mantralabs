// document.addEventListener('DOMContentLoaded', () => {
//   "use strict";

//   if(typeof window.IntersectionObserver !== 'undefined') {
//     let options = {
//       threshold: [0.5, 1]
//     }
//     const targets = document.querySelectorAll('.cb');
//     const locker = document.querySelector('.locker__container');
//     function handleIntersection(entries) {
//       entries.map((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.current = entry.target.dataset.swap;
//           document.querySelector(".locker__container ." + entry.target.current).classList.add("active");
//         } else {
//           document.querySelector(".locker__container ." + entry.target.current).classList.remove("active");
//         }
//       });
//     }
//     const observer = new IntersectionObserver(handleIntersection, options);
//     targets.forEach(target => observer.observe(target));
//   } else {
//   }

// });

// Add Scroll Event Listener

// if (typeof window.IntersectionObserver !== 'undefined') {
//   const options = {
//     threshold: [0.5, 1],
//   };

//   const sections = document.querySelectorAll('.cb'); 
//   const images = document.querySelectorAll('.lock-image'); 

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const targetImageClass = entry.target.dataset.swap;
//       const targetImage = document.querySelector(`.${targetImageClass}`);

//       if (entry.isIntersecting) {
//         images.forEach((img) => img.classList.remove('active')); 
//         if (targetImage) targetImage.classList.add('active'); 
//       }
//     });
//   }, options);

//   sections.forEach((section) => observer.observe(section));
// } else {
//   console.warn('IntersectionObserver is not supported in this browser.');
// }



(function() {
  "use strict";
  $('.scroll-down').click(function() {
      $('html, body').animate({
          scrollTop: $('section').next().offset().top
      }, 1000);
  });
})();

$('.carousel-test').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: false,
  navText: ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"],
  autoplay: true,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 3
    }
  }
})

$('.carousel-home').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  navText: ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"],
  autoplay: false,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    }
  }
})

$('.carousel-business').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  navText: ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"],
  autoplay: true,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    }
  }
})


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

