import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./HomePage'));
const Article = lazy(() => import('./ArticlePage'));
const Sidebar = lazy(() => import('./Sidebar'));
const NewsletterModal = lazy(() => import('./NewsletterModal'));

const AppRouter: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
      <Sidebar />
      <NewsletterModal />
    </Suspense>
  </Router>
);

export default AppRouter;