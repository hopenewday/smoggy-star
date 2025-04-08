document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.newsletter-modal');
  const closeBtn = document.querySelector('.close-modal');
  const form = document.getElementById('newsletter-form');

  // Show modal after 5 seconds
  setTimeout(() => {
    modal.classList.remove('hidden');
  }, 5000);

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');

    fetch('YOUR_NEWSLETTER_API_ENDPOINT_HERE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(response => {
      if (response.ok) {
        alert('Thank you for subscribing!');
        modal.classList.add('hidden');
        form.reset();
      } else {
        alert('Subscription failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  });
});