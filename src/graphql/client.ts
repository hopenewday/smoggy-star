import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: import.meta.env.PUBLIC_SVELTIA_CMS_URL || process.env.SVELTIA_CMS_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.PUBLIC_SVELTIA_CMS_TOKEN || process.env.SVELTIA_CMS_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

export default client;