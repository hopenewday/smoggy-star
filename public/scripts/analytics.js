/* Google Analytics with consent */
function initGoogleAnalytics() {
  if (!window.localStorage.getItem('cookie_consent')) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXXX-X'); // TODO: Replace with real GA ID

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X';
  document.head.appendChild(gaScript);
}

/* Sentry */
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://your-sentry-dsn.ingest.sentry.io/project-id', // TODO: Replace with real DSN
  integrations: [],
  tracesSampleRate: 1.0,
});

/* Custom event tracking */
export function trackEvent(category, action, label = '', value = 0) {
  if (typeof gtag === 'function') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/* Core Web Vitals */
import { onCLS, onFID, onLCP } from 'web-vitals';

function sendToAnalytics({ name, delta, id }) {
  if (typeof gtag === 'function') {
    gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      event_label: id,
      non_interaction: true,
    });
  }
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);

/* Initialize */
initGoogleAnalytics();