import React, { useEffect, useState } from 'react';
import client from '../graphql/client';
import { gql } from '@apollo/client';

interface TrendingStory {
  id: string;
  title: string;
  slug: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const GET_SIDEBAR_DATA = gql`
  query GetSidebarData {
    trendingStories {
      id
      title
      slug
    }
    socialLinks {
      id
      platform
      url
    }
  }
`;

const Sidebar: React.FC = () => {
  const [trending, setTrending] = useState<TrendingStory[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    client.query({ query: GET_SIDEBAR_DATA })
      .then(res => {
        setTrending(res.data.trendingStories);
        setSocialLinks(res.data.socialLinks);
      })
      .catch(err => console.error('Failed to fetch sidebar data', err));
  }, []);

  return (
    <aside className="w-full md:w-64 p-4 space-y-8">
      <section>
        <h2 className="font-bold mb-2">Trending</h2>
        <ul>
          {trending.map(story => (
            <li key={story.id}>
              <a href={`/article/${story.slug}`} className="hover:underline">{story.title}</a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-bold mb-2">Follow Us</h2>
        <ul className="flex space-x-4">
          {socialLinks.map(link => (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.platform}</a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;