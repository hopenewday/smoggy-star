let deferredPrompt;
const btn = document.createElement('button');
btn.textContent = 'Add to Home Screen';
btn.style.position = 'fixed';
btn.style.bottom = '20px';
btn.style.right = '20px';
btn.style.padding = '10px 15px';
btn.style.background = '#007acc';
btn.style.color = '#fff';
btn.style.border = 'none';
btn.style.borderRadius = '4px';
btn.style.cursor = 'pointer';
btn.style.zIndex = '1000';
btn.style.display = 'none';
document.body.appendChild(btn);

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btn.style.display = 'block';
});

btn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  btn.style.display = 'none';
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('User response to A2HS prompt:', outcome);
  deferredPrompt = null;
});