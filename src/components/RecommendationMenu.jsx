import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fetchRecommendations } from '../utils/cmsApi';

/**
 * Dynamic Recommendation Overlay Menu
 * Fetches related tags and categories for an article and displays them in an accessible overlay.
 */
function RecommendationMenu({ articleId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ tags: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const overlayRef = useRef(null);
  // Removed unused firstFocusableRef and lastFocusableRef

  // Fetch recommendations with caching
  useEffect(() => {
    if (!isOpen) return;
    const cached = sessionStorage.getItem(`recs-${articleId}`);
    if (cached) {
      setData(JSON.parse(cached));
      return;
    }
    setLoading(true);
    setError('');
    fetchRecommendations(articleId)
      .then((res) => {
        setData(res);
        sessionStorage.setItem(`recs-${articleId}`, JSON.stringify(res));
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to load recommendations.');
      })
      .finally(() => setLoading(false));
  }, [isOpen, articleId]);

  // Close on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    function handleTabKey(event) {
      if (event.key !== 'Tab' || !isOpen) return;
      const focusableEls = overlayRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTabKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="recommendation-overlay"
        onClick={() => setIsOpen(!isOpen)}
        className="rec-menu-button"
      >
        Show Recommendations
      </button>
      {isOpen && (
        <div
          ref={overlayRef}
          id="recommendation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Related tags and categories"
          className="rec-overlay"
          tabIndex="-1"
        >
          <div className="rec-content">
            {loading && <p>Loading recommendations...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
              <>
                <h2>Related Tags</h2>
                {data.tags.length > 0 ? (
                  <ul>
                    {data.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                ) : (
                  <p>No related tags found.</p>
                )}
                <h2>Related Categories</h2>
                {data.categories.length > 0 ? (
                  <ul>
                    {data.categories.map(cat => <li key={cat}>{cat}</li>)}
                  </ul>
                ) : (
                  <p>No related categories found.</p>
                )}
              </>
            )}
            <button onClick={() => setIsOpen(false)} className="rec-close-button">Close</button>
          </div>
        </div>
      )}
    </>
  );
}

RecommendationMenu.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default RecommendationMenu;