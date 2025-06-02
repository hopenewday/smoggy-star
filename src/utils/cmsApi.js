const CMS_ENDPOINT = import.meta.env.PUBLIC_SVELTIA_CMS_URL;

/**
 * Generic GraphQL query function.
 */
async function cmsQuery(query, variables = {}) {
  const response = await fetch(CMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.SVELTIA_CMS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    console.error('CMS query failed:', response.statusText);
    return null;
  }

  const { data, errors } = await response.json();
  if (errors) {
    console.error('CMS GraphQL errors:', errors);
    return null;
  }
  return data;
}

/**
 * Fetch navigation structure from CMS.
 */
export async function fetchNavigation() {
  const query = `
    query {
      navigation {
        title
        url
        children {
          title
          url
        }
      }
    }
  `;
  const data = await cmsQuery(query);
  return data?.navigation || [];
}

/**
 * Fetch related articles based on tags/categories.
 */
export async function fetchRelatedContent(tags = [], categories = []) {
  const query = `
    query($tags: [String!], $categories: [String!]) {
      relatedContent(tags: $tags, categories: $categories) {
        id
        title
        url
        tags
        categories
      }
    }
  `;
  const variables = { tags, categories };
  const data = await cmsQuery(query, variables);
  return data?.relatedContent || [];
}

/**
 * Calculate relevancy score for content.
 */
export function calculateRelevancyScore(contentItem, userTags = [], userCategories = [], options = {}) {
  let score = 0;

  // Tag and category matching
  contentItem.tags.forEach(tag => {
    if (userTags.includes(tag)) score += 2;
  });
  contentItem.categories.forEach(cat => {
    if (userCategories.includes(cat)) score += 1;
  });

  // Recency weighting (favor recent articles)
  if (contentItem.publishedAt) {
    const ageDays = (Date.now() - new Date(contentItem.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays < 1) score += 3; // Today
    else if (ageDays < 7) score += 2; // This week
    else if (ageDays < 30) score += 1; // This month
  }

  // Penalize already viewed articles
  if (options.viewedArticleIds && options.viewedArticleIds.includes(contentItem.id)) {
    score -= 5;
  }

  // Future: add user interaction weighting (e.g., time spent, likes)

  return score;

/**
 * Fetch tags and categories for a specific article by ID
 */
async function fetchRecommendations(articleId) {
  const query = `
    query($id: ID!) {
      article(id: $id) {
        tags
        categories
      }
    }
  `;
  const variables = { id: articleId };
  const data = await cmsQuery(query, variables);
  if (!data || !data.article) {
    return { tags: [], categories: [] };
  }
  return {
    tags: data.article.tags || [],
    categories: data.article.categories || []
  };
}

module.exports.fetchRecommendations = fetchRecommendations;

}