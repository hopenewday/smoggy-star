import { fetchRelatedContent, calculateRelevancyScore } from './cmsApi.js';

/**
 * Track viewed article in localStorage.
 */
export function trackArticleView(articleId, tags = [], categories = []) {
  const history = JSON.parse(localStorage.getItem('viewHistory') || '[]');
  history.push({ articleId, tags, categories, viewedAt: Date.now() });
  localStorage.setItem('viewHistory', JSON.stringify(history.slice(-50))); // Keep last 50
}

/**
 * Get personalized recommendations based on view history.
 */
export async function getPersonalizedRecommendations() {
  const history = JSON.parse(localStorage.getItem('viewHistory') || '[]');
  const userTags = new Set();
  const userCategories = new Set();
  const viewedArticleIds = new Set();

  history.forEach(item => {
    item.tags.forEach(tag => userTags.add(tag));
    item.categories.forEach(cat => userCategories.add(cat));
    viewedArticleIds.add(item.articleId);
  });

  const related = await fetchRelatedContent([...userTags], [...userCategories]);

  // Score and sort
  const scored = related.map(item => ({
    ...item,
    score: calculateRelevancyScore(
      item,
      [...userTags],
      [...userCategories],
      { viewedArticleIds: [...viewedArticleIds] }
    ),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored;
}

/**
 * Refresh recommendations dynamically (live update).
 * @returns {Promise<Array>} Updated recommendations
 */
export async function refreshRecommendations() {
  return getPersonalizedRecommendations();
}

/**
 * SSR fallback: fetch popular or recent content.
 */
export async function getFallbackRecommendations() {
  const related = await fetchRelatedContent([], []);
  return related;
}