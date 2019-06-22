import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { cookies, subscribe } from 'brownies';
import App from '../App';

const SERVICE_URL = 'https://upgrade-songs.herokuapp.com';

function AppApolloHoc({ children }) {
  const { authToken } = cookies;
  const [userAuthToken, setUserAuthToken] = useState(authToken);

  // Setting up Apollo client
  const client = new ApolloClient({
    uri: `${SERVICE_URL}/graphql`,
    headers: {
      Authorization: authToken
    }
  });

  subscribe(cookies, 'authToken', value => {
    setUserAuthToken(value);
  });

  return (
    <ApolloProvider client={client}>
      <App authToken={userAuthToken} />
    </ApolloProvider>
  );
}

export default AppApolloHoc;
