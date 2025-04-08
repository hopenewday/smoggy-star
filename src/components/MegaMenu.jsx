import React, { useState, useEffect } from 'react';
import { fetchNavigation } from '../utils/cmsApi.js';

/**
 * MegaMenu component with SSR fallback.
 * @param {Object} props
 * @param {Array} props.initialMenu - Navigation data fetched server-side
 */
export default function MegaMenu({ initialMenu = [] }) {
  const [menu, setMenu] = useState(initialMenu);

  useEffect(() => {
    async function loadMenu() {
      try {
        const nav = await fetchNavigation();
        setMenu(nav);
      } catch (err) {
        console.error('Failed to fetch navigation:', err);
        setMenu([
          { title: 'Home', url: '/', children: [] },
          { title: 'About', url: '/about', children: [] },
          { title: 'Contact', url: '/contact', children: [] }
        ]);
      }
    }
    loadMenu();
  }, []);

  return (
    <nav role="navigation" aria-label="Main menu">
      <ul className="mega-menu">
        {menu.map((item, idx) => (
          <li key={idx}>
            <a href={item.url}>{item.title}</a>
            {item.children && item.children.length > 0 && (
              <ul className="submenu" role="menu">
                {item.children.map((child, cidx) => (
                  <li key={cidx} role="none">
                    <a href={child.url} role="menuitem" tabIndex={-1}>
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}