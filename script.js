let scrollPosition = 0;

const lightbox = document.getElementById('lightbox');
const content = document.querySelector('.js-lightbox-content');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.open-lightbox').forEach(card => {
  card.addEventListener('click', () => {
    scrollPosition = window.scrollY;

    const clonedCard = card.cloneNode(true);
    clonedCard.classList.remove('hover-grow', 'open-lightbox');

    // Remove old card if exists
    content.querySelector('.card')?.remove();
    content.appendChild(clonedCard);

    lightbox.classList.add('active');

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  content.querySelector('.card')?.remove();

  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, scrollPosition);
}

/* Close actions */
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('js-lightbox-overlay')
  ) {
    closeLightbox();
  }
});

/* ESC key support */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});
