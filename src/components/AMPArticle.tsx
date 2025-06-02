import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AmpImg } from 'react-amphtml'; // Removed AmpVideo, AmpCarousel

interface AMPArticleProps {
  title: string;
  content: string;
  imageUrl: string;
}

const AMPArticle: React.FC<AMPArticleProps> = ({ title, content, imageUrl }) => {
  return (
    <html amp="">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="/" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style amp-boilerplate="">
          {`body{visibility:hidden}amp-img{max-width:100%}`}
        </style>
        <noscript>
          <style amp-boilerplate="">
            {`body{visibility:visible}`}
          </style>
        </noscript>
      </head>
      <body>
        <h1>{title}</h1>
        <AmpImg src={imageUrl} width="800" height="400" layout="responsive" alt={title} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </body>
    </html>
  );
};

export function renderAMPArticle(props: AMPArticleProps) {
  return '<!doctype html>' + renderToStaticMarkup(<AMPArticle {...props} />);
}

export default AMPArticle;