const API_BASE = import.meta.env.PUBLIC_SVELTIA_API_ENDPOINT;
const API_KEY = import.meta.env.PUBLIC_SVELTIA_API_KEY;

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}?apiKey=${API_KEY}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

async function apiPost(path, data) {
  const res = await fetch(`${API_BASE}${path}?apiKey=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}

export { apiGet, apiPost };