document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero .slide');
  let currentSlide = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Initial display
  showSlide(currentSlide);

  // Cycle every 5 seconds
  setInterval(nextSlide, 5000);
});