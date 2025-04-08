import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/slices/preferencesSlice';
import client from '../graphql/client';
import { gql } from '@apollo/client';

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Category[];
}

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      slug
      subcategories {
        id
        name
        slug
      }
    }
  }
`;

const Header: React.FC = () => {
  const darkMode = useSelector((state: any) => state.preferences.darkMode);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    client.query({ query: GET_CATEGORIES })
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error('Failed to fetch categories', err));
  }, []);

  return (
    <header className={`sticky top-0 z-50 ${darkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow">
        <div className="text-xl font-bold">MySite</div>
        <nav className="flex space-x-4">
          {categories.map(cat => (
            <div key={cat.id} className="group relative">
              <a href={`/category/${cat.slug}`} className="hover:underline">{cat.name}</a>
              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="absolute left-0 top-full hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg p-4">
                  {cat.subcategories.map(sub => (
                    <a key={sub.id} href={`/category/${sub.slug}`} className="block py-1 hover:underline">{sub.name}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <button onClick={() => dispatch(toggleDarkMode())} className="ml-4">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;