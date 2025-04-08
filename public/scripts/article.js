document.addEventListener('DOMContentLoaded', () => {
  const relatedList = document.getElementById('related-list');

  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `/articles/${post.id}`;
        a.textContent = post.title;
        li.appendChild(a);
        relatedList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching related articles:', error);
    });
});