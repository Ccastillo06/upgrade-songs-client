import React from 'react';
import { graphql } from 'react-apollo';

import { getSongsQuery } from '../graphql/queries';

function SongList({ data, history }) {
  const { loading, songs } = data;

  if (loading) {
    return <h1>Fetching songs...</h1>;
  }

  return (
    <React.Fragment>
      <button type="button" onClick={() => history.push('/')}>
        Go back
      </button>
      <ul>
        {songs.map(({ id, name, genre }) => (
          <li key={id}>
            <p>Name: {name}</p>
            <p>Genre: {genre}</p>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default graphql(getSongsQuery)(SongList);
