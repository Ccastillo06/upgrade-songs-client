import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { addAuthorMutation } from '../graphql/mutations';
import { getAuthorsQuery } from '../graphql/queries';

function AuthorForm({ history, addAuthor }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();

    if (name && age) {
      addAuthor({
        variables: {
          name,
          age: parseInt(age, 10)
        },
        refetchQueries: [{ query: getAuthorsQuery }]
      })
        .then(() => {
          history.push('/authors');
        })
        .catch(e => console.log(e));
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        <span>Author name</span>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        <span>Author age</span>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} />
      </label>
      <button type="submit">Create author</button>
    </form>
  );
}

export default graphql(addAuthorMutation, { name: 'addAuthor' })(AuthorForm);
