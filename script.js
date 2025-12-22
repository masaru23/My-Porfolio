document.addEventListener('DOMContentLoaded', () => {

  /* ================= FADE-IN ON SCROLL ================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.card, .hero, .fade-in').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  /* ================= LIGHTBOX FOR CARDS ================= */
  let scrollPosition = 0;

  const lightbox = document.getElementById('lightbox');
  const content = document.querySelector('.js-lightbox-content');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!lightbox || !content || !closeBtn) {
    console.warn('⚠️ Lightbox elements not found. Make sure lightbox HTML exists.');
  } else {

    function openLightbox(card) {
      scrollPosition = window.scrollY;

      const clonedCard = card.cloneNode(true);
      clonedCard.classList.remove('hover-grow', 'open-lightbox');

      content.querySelector('.card')?.remove();
      content.appendChild(clonedCard);

      lightbox.classList.add('active');

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      content.querySelector('.card')?.remove();

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }

    function bindCardClicks() {
      document.querySelectorAll('.open-lightbox').forEach(card => {
        card.addEventListener('click', () => openLightbox(card));
      });
    }

    bindCardClicks();

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-lightbox-overlay')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ================= RANDOM RAIN PARTICLES ================= */
  const rainContainer = document.getElementById('rain-container');

  if (!rainContainer) {
    console.warn('⚠️ Rain container not found. Add <div id="rain-container"></div> to HTML.');
    return;
  }

  function createRaindrop() {
    const drop = document.createElement('div');
    drop.className = 'raindrop';

    // Randomized properties
    drop.style.left = Math.random() * window.innerWidth + 'px';
    drop.style.height = Math.random() * 60 + 20 + 'px';
    drop.style.opacity = Math.random() * 0.45 + 0.05;
    drop.style.animationDuration = Math.random() * 1.5 + 0.7 + 's';
    const wind = Math.random() * 60 - 40; // -30px to +30px
    drop.style.setProperty('--wind', `${wind}px`);
    const left = Math.random() * (window.innerWidth - 60) + 30;
    drop.style.left = `${left}px`;



    rainContainer.appendChild(drop);

    // Remove after animation
    setTimeout(() => {
      drop.remove();
    }, 3000);
  }

  // Control rain density
  setInterval(() => {
    const dropsCount = Math.floor(Math.random() * 4) + 1; // random amount
    for (let i = 0; i < dropsCount; i++) {
      createRaindrop();
    }
  }, 60);

});
