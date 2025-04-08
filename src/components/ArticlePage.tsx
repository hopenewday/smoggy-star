import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../graphql/client';
import { gql } from '@apollo/client';

interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  datePublished: string;
  contentHtml: string;
  imageUrl: string;
}

const GET_ARTICLE = gql`
  query GetArticle($slug: String!) {
    article(slug: $slug) {
      id
      title
      slug
      author
      datePublished
      contentHtml
      imageUrl
    }
  }
`;

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    client.query({ query: GET_ARTICLE, variables: { slug } })
      .then(res => setArticle(res.data.article))
      .catch(err => console.error('Failed to fetch article', err));
  }, [slug]);

  if (!article) return <div>Loading...</div>;

  return (
    <article className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        By {article.author} on {new Date(article.datePublished).toLocaleDateString()}
      </div>
      <img src={article.imageUrl} alt={article.title} className="w-full mb-6" />
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </article>
  );
};

export default ArticlePage;