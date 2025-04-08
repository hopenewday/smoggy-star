import React from 'react';

const SkipLink: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only absolute top-0 left-0 bg-blue-600 text-white p-2 z-50"
  >
    Skip to main content
  </a>
);

export default SkipLink;