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
  form.addEventListener('submit', async (e) => { // Added async
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');

    // Ensure modal and form elements exist to prevent errors if markup changes
    // These checks are more robust if modal and form are queried inside, 
    // but keeping structure similar to original where they are defined outside this handler.
    if (!document.querySelector('.newsletter-modal') || !document.getElementById('newsletter-form')) {
        console.error('Newsletter modal or form not found in the DOM for submission handler.');
        return;
    }
    
    // Re-query them here or use variables from outer scope (assuming they are const modal, const form)
    const currentModal = document.querySelector('.newsletter-modal');
    const currentForm = document.getElementById('newsletter-form');


    try {
      const response = await fetch('YOUR_NEWSLETTER_API_ENDPOINT_HERE', { // Replace with actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('Thank you for subscribing!');
        if(currentModal) currentModal.classList.add('hidden');
        if(currentForm) currentForm.reset();
      } else {
        // Attempt to get error message from API if available
        const errorData = await response.json().catch(() => null); // Safely try to parse error
        const message = errorData?.message || `Subscription failed (status: ${response.status}). Please try again.`;
        alert(message);
      }
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      alert('An error occurred while subscribing. Please try again.');
    }
  });
});