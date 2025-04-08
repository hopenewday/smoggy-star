import React, { Suspense, lazy } from 'react';

const Header = lazy(() => import('./Header'));
const Hero = lazy(() => import('./Hero'));
const Sidebar = lazy(() => import('./Sidebar'));
const NewsletterModal = lazy(() => import('./NewsletterModal'));
const ArticlePage = lazy(() => import('./ArticlePage'));

const AsyncComponents: React.FC = () => (
  <>
    <Suspense fallback={<div>Loading header...</div>}>
      <Header />
    </Suspense>
    <Suspense fallback={<div>Loading hero...</div>}>
      <Hero />
    </Suspense>
    <main className="flex flex-col md:flex-row max-w-7xl mx-auto p-4">
      <section className="flex-1 p-4">
        <Suspense fallback={<div>Loading article...</div>}>
          <ArticlePage />
        </Suspense>
      </section>
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>
    </main>
    <Suspense fallback={<div>Loading newsletter...</div>}>
      <NewsletterModal />
    </Suspense>
  </>
);

export default AsyncComponents;