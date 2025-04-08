import type { APIRoute } from 'astro';

// Facebook Instant Articles feed removed
export const GET: APIRoute = async () => {
  return new Response('', {
    status: 410,
    statusText: 'Gone',
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};