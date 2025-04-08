import React, { useEffect, useState } from 'react';

const kitApiUrl = import.meta.env.PUBLIC_KIT_API_URL || process.env.PUBLIC_KIT_API_URL;
const kitApiKey = import.meta.env.PUBLIC_KIT_API_KEY || process.env.PUBLIC_KIT_API_KEY;

const NewsletterModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${kitApiUrl}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${kitApiKey}`,
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      alert('Thank you for subscribing!');
      setVisible(false);
    } catch {
      alert('Subscription failed. Please try again.');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Subscribe
          </button>
          <button type="button" onClick={() => setVisible(false)} className="text-sm text-gray-500 hover:underline">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterModal;