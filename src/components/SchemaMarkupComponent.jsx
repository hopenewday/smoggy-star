import React from 'react';
import { Helmet } from 'react-helmet';

const SchemaMarkupComponent = ({ schemaData, type, data }) => {
  const generateSchema = () => {
    switch (type) {
      case 'Article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.headline,
          "description": data.description,
          "author": data.author,
          "datePublished": data.datePublished,
          "publisher": {
            "@type": "Organization",
            "name": data.publisher.name,
            "logo": {
              "@type": "ImageObject",
              "url": data.publisher.logo.url,
              "width": data.publisher.logo.width,
              "height": data.publisher.logo.height
            }
          }
        };
      case 'Event':
        return {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": data.name,
          "startDate": data.startDate,
          "endDate": data.endDate,
          "location": {
            "@type": "Place",
            "name": data.location.name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": data.location.address.streetAddress,
              "addressLocality": data.location.address.addressLocality,
              "postalCode": data.location.address.postalCode,
              "addressCountry": data.location.address.addressCountry
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": data.organizer.name,
            "url": data.organizer.url
          }
        };
      default:
        return {};
    }
  };

  const schema = generateSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkupComponent;