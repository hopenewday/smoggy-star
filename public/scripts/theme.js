document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.theme-toggle');
  const body = document.body;

  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.add('light');
  }

  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light')) {
      body.classList.remove('light');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  });
});