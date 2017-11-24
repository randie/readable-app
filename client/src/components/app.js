import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout';
import Store from './store';
import HomePage from './home-page';
import NotFoundPage from './not-found-page';

export default () => (
  <Store>
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </Layout>
  </Store>
);
