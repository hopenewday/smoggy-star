document.addEventListener('DOMContentLoaded', () => {
  const lazyElements = document.querySelectorAll('img[data-src], iframe[data-src], video[data-src]');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.src) {
          el.src = el.dataset.src;
          el.removeAttribute('data-src');
        }
        if (el.tagName === 'VIDEO') {
          el.load();
        }
        obs.unobserve(el);
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0.1
  });

  lazyElements.forEach(el => observer.observe(el));
});