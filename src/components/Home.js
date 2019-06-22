import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Link to="/songs">Go to songs</Link>
      <Link to="/authors">Go to authors</Link>
      <Link to="/create-song">Create a song</Link>
      <Link to="/create-author">Create an author</Link>
    </div>
  );
}

export default Home;
