import { gsap } from "gsap";

let currentIndex = 0;
let articles = [];

export async function loadFlashFeed() {
  const container = document.querySelector('.swiper-container');
  if (!container) return;

  container.innerHTML = '<p style="padding:1rem;">Loading...</p>';

  try {
    const response = await fetch('/api/articles'); // Adjust API endpoint as needed
    const data = await response.json();
    const items = data.articles || data || [];

    container.innerHTML = '';

    items.forEach((article, idx) => {
      const card = document.createElement('div');
      card.className = 'article-card';
      if (idx === 0) card.classList.add('active');
      card.innerHTML = `
        <div style="padding: 20px;">
          <h2>${article.title}</h2>
          <p>${article.summary || ''}</p>
        </div>
      `;
      container.appendChild(card);
    });

    articles = container.querySelectorAll('.article-card');
    currentIndex = 0;
  } catch (err) {
    container.innerHTML = '<p style="padding:1rem;color:red;">Failed to load articles.</p>';
    console.error(err);
  }
}

function showArticle(index, direction) {
  if (!articles.length || index < 0 || index >= articles.length || index === currentIndex) return;

  const current = articles[currentIndex];
  const next = articles[index];

  gsap.to(current, {
    y: direction === 'up' ? '-100%' : '100%',
    opacity: 0,
    duration: 0.5,
    onComplete: () => current.classList.remove('active')
  });

  next.style.transform = `translateY(${direction === 'up' ? '100%' : '-100%'})`;
  next.classList.add('active');

  gsap.fromTo(next,
    { y: direction === 'up' ? '100%' : '-100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.5 }
  );

  currentIndex = index;
}

function onSwipe(direction) {
  let newIndex = currentIndex;
  if (direction === 'up') newIndex++;
  else if (direction === 'down') newIndex--;

  showArticle(newIndex, direction);
}

let startY = 0;
window.addEventListener('touchstart', e => startY = e.touches[0].clientY);
window.addEventListener('touchend', e => {
  const deltaY = e.changedTouches[0].clientY - startY;
  if (deltaY < -50) onSwipe('up');
  else if (deltaY > 50) onSwipe('down');
});