import React, { useEffect, useState } from 'react';
import client from '../graphql/client';
import { gql } from '@apollo/client';

interface FeaturedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
}

const GET_FEATURED_ARTICLES = gql`
  query GetFeaturedArticles {
    featuredArticles {
      id
      title
      slug
      excerpt
      imageUrl
    }
  }
`;

const Hero: React.FC = () => {
  const [articles, setArticles] = useState<FeaturedArticle[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    client.query({ query: GET_FEATURED_ARTICLES })
      .then(res => setArticles(res.data.featuredArticles))
      .catch(err => console.error('Failed to fetch featured articles', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [articles]);

  if (articles.length === 0) return null;

  const article = articles[current];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{article.title}</h1>
        <p className="max-w-2xl mb-6">{article.excerpt}</p>
        <a href={`/article/${article.slug}`} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-lg font-semibold transition">Read More</a>
      </div>
    </section>
  );
};

export default Hero;