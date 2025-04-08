document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
  const searchInput = document.getElementById('search-input');
  const suggestionsList = document.getElementById('search-suggestions');

  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Toggle dropdowns on mobile
  dropdownToggles.forEach(link => {
    link.addEventListener('click', (e) => {
      const parentLi = link.parentElement;
      if (window.innerWidth <= 768) {
        e.preventDefault();
        parentLi.classList.toggle('open');
      }
    });
  });

  // Dynamic search suggestions
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
      suggestionsList.innerHTML = '';
      suggestionsList.classList.add('hidden');
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}&_limit=5`)
      .then(response => response.json())
      .then(results => {
        suggestionsList.innerHTML = '';
        results.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item.title;
          li.tabIndex = 0;
          li.addEventListener('click', () => {
            searchInput.value = item.title;
            suggestionsList.classList.add('hidden');
          });
          suggestionsList.appendChild(li);
        });
        suggestionsList.classList.remove('hidden');
      })
      .catch(error => {
        console.error('Search error:', error);
        suggestionsList.innerHTML = '';
        suggestionsList.classList.add('hidden');
      });
  });

  // Hide suggestions on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      suggestionsList.classList.add('hidden');
    }
  });
});