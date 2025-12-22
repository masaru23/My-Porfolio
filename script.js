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
    return;
  }

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

  // Attach click to all project cards
  function bindCardClicks() {
    document.querySelectorAll('.open-lightbox').forEach(card => {
      card.addEventListener('click', () => openLightbox(card));
    });
  }

  bindCardClicks();

  /* Close actions */
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

});
