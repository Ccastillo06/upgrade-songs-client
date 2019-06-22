import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import SongList from './components/SongList';
import AuthorList from './components/AuthorList';
import SongForm from './components/SongForm';

import './App.scss';

function App({ data }) {
  return (
    <Router>
      <div className="App">
        <h1>Im working</h1>
        <Switch>
          <Route exact path="/songs" component={SongList} />
          <Route exact path="/authors" component={AuthorList} />
          <Route exact path="/create-song" component={SongForm} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
