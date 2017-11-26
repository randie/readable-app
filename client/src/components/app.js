import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './store';
import Layout from './layout';
import HomePage from './home-page';
import NotFoundPage from './not-found-page';

export default () => (
  <Store>
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:category" component={HomePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </Layout>
  </Store>
);
