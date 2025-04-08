document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.querySelector('.back-to-top');
  const flashToggle = document.getElementById('flashToggle');
  const flashFeed = document.getElementById('flashFeed');

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  flashToggle.addEventListener('click', async () => {
    const isActive = flashFeed.classList.toggle('active');
    if (isActive) {
      // Dynamically import the flash feed loader
      const module = await import('./mobileSwiper.js');
      if (module.loadFlashFeed) {
        module.loadFlashFeed();
      }
    }
  });
});