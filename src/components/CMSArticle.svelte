<script>
  // This is a placeholder for a Sveltia CMS component.
  // Actual implementation is expected to be provided by Sveltia CMS.
  export let articleData = {}; // Example prop for article content
</script>

<article>
  <h2>CMSArticle Placeholder - Actual component from Sveltia CMS</h2>
  <p>This component will display the main content of an article.</p>
  <!-- Expected article content using 'articleData' prop. For example:
  <h1>{articleData.title || 'Article Title'}</h1>
  <div>{@html articleData.content || '<p>Article content goes here...</p>'}</div>
  <p>Published on: {new Date(articleData.publishDate || Date.now()).toLocaleDateString()}</p>
  -->
</article>

<style>
  article {
    padding: 1.5rem;
    margin: 1rem 0;
    background-color: #f9f9f9;
    border: 1px dashed #bbb;
    font-family: sans-serif;
  }
  h2 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  p {
    color: #666;
    line-height: 1.6;
  }
</style>
