import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/book" exact component={Book} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;