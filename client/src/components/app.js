import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './store';
import HomePage from './home-page';
import NotFoundPage from './not-found-page';

export default () => (
  <Store>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:category" component={HomePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  </Store>
);
