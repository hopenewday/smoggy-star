document.addEventListener('DOMContentLoaded', () => {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    return;
  }

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          obs.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      // Move src to data-src if not already done
      if (!img.dataset.src) {
        img.dataset.src = img.src;
        img.src = '';
      }
      observer.observe(img);
    });
  } else {
    // Fallback: load all images immediately
    lazyImages.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
});