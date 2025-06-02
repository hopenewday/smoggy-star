document.addEventListener('DOMContentLoaded', async () => { // Added async
  const relatedList = document.getElementById('related-list');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) { // Added basic error checking
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();

    posts.forEach(post => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/articles/${post.id}`; // Note: This assumes a route /articles/:id exists
      a.textContent = post.title;
      li.appendChild(a);
      if (relatedList) { // Added null check for relatedList
        relatedList.appendChild(li);
      } else {
        console.warn('Element with ID "related-list" not found.');
      }
    });
  } catch (error) {
    console.error('Error fetching related articles:', error);
  }
});
