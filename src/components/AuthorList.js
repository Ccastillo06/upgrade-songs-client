import React from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../graphql/queries';

function SongList({ data, history }) {
  const { loading, authors } = data;

  if (loading) {
    return <h1>Fetching authors...</h1>;
  }

  return (
    <React.Fragment>
      <button type="button" onClick={() => history.push('/')}>
        Go back
      </button>
      <ul>
        {authors.map(({ id, name, age, songs }) => (
          <li key={id}>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>
              Songs:{' '}
              {songs.map(({ id, name }) => (
                <span key={id}>{name}</span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default graphql(getAuthorsQuery)(SongList);
