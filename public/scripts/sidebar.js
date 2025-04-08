
(Optional) JavaScript if any interactivity is needed (e.g., a “Back to top” button).document.addEventListener('DOMContentLoaded', () => {
  const trendingList = document.getElementById('trending-list');

  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `/trending/${post.id}`;
        a.textContent = post.title;
        li.appendChild(a);
        trendingList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching trending stories:', error);
    });
});