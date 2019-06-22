import React from 'react';
import { graphql, compose } from 'react-apollo';

import { getSongsQuery } from '../graphql/queries';
import { deleteSongMutation } from '../graphql/mutations';

function SongList({ songsQuery, deleteSong, history }) {
  const { loading, songs } = songsQuery;

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
            <button
              onClick={() =>
                deleteSong({
                  variables: {
                    id
                  },
                  refetchQueries: [{ query: getSongsQuery }]
                })
              }
            >
              Delete Song
            </button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default compose(
  graphql(getSongsQuery, { name: 'songsQuery' }),
  graphql(deleteSongMutation, { name: 'deleteSong' })
)(SongList);
