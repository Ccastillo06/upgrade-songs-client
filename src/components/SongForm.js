import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery } from '../graphql/queries';
import { addSongMutation } from '../graphql/mutations';

const GENRE_LIST = ['Rock', 'Pop', 'Rap', 'Reggae', 'Metal', 'Classic'];

function SongForm({ history, authorsQuery, addSong }) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();

    if (name && year && genre && authorId) {
      addSong({
        variables: {
          name,
          year: parseInt(year, 10),
          genre,
          authorId
        },
        refetchQueries: [{ query: getAuthorsQuery }]
      })
        .then(() => {
          history.push('/songs');
        })
        .catch(e => console.log(e));
    }
  }

  const { loading, authors } = authorsQuery;

  if (loading) {
    return <h1>Fetching authors</h1>;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        <span>Song name</span>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        <span>Song year</span>
        <input type="number" value={year} onChange={e => setYear(e.target.value)} />
      </label>
      <label>
        <span>Song genre</span>
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="">Select a genre</option>
          {GENRE_LIST.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Song author</span>
        <select value={authorId} onChange={e => setAuthorId(e.target.value)}>
          <option value="">Select an author</option>
          {authors.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Create song</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: 'authorsQuery' }),
  graphql(addSongMutation, { name: 'addSong' })
)(SongForm);
