import React, { useEffect, useState } from 'react';
import SchemaMarkupComponent from './SchemaMarkupComponent';

const CMSIntegrationComponent = ({ contentId, type }) => {
  const [schemaData, setSchemaData] = useState(null);

  useEffect(() => {
    const fetchSchemaData = async () => {
      const response = await fetch(`${import.meta.env.PUBLIC_SVELTIA_CMS_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.SVELTIA_CMS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
            query GetContent($id: ID!) {
              content(id: $id) {
                schemaData
              }
            }
          `,
          variables: { id: contentId },
        }),
      });

      const result = await response.json();
      setSchemaData(result.data.content.schemaData);
    };

    fetchSchemaData();
  }, [contentId]);

  return schemaData ? <SchemaMarkupComponent schemaData={schemaData} type={type} data={schemaData} /> : null;
};

import PropTypes from 'prop-types';

CMSIntegrationComponent.propTypes = {
  contentId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CMSIntegrationComponent;