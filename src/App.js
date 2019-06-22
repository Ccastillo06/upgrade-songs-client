import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { cookies } from 'brownies';

import Authentication from './components/Authentication';
import Home from './components/Home';
import SongList from './components/SongList';
import AuthorList from './components/AuthorList';
import SongForm from './components/SongForm';
import AuthorForm from './components/AuthorForm';

import './App.scss';

function App({ authToken }) {
  const isValidToken = !!authToken;
  const [isAuthenticated, setIsAuthenticated] = useState(isValidToken);

  function handleDeleteCookie() {
    delete cookies.authToken;
  }

  useEffect(() => {
    if (isValidToken && !isAuthenticated) {
      setIsAuthenticated(true);
    }

    if (!isValidToken && isAuthenticated) {
      setIsAuthenticated(false);
    }
  }, [isValidToken, isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <h1>Im working</h1>
        {isAuthenticated && (
          <button type="button" onClick={handleDeleteCookie}>
            Logout
          </button>
        )}
        <Switch>
          {isAuthenticated ? (
            <React.Fragment>
              <Route exact path="/songs" component={SongList} />
              <Route exact path="/authors" component={AuthorList} />
              <Route exact path="/create-song" component={SongForm} />
              <Route exact path="/create-author" component={AuthorForm} />
              <Route path="/" component={Home} />
            </React.Fragment>
          ) : (
            <Route path="/" component={Authentication} />
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
