import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './store';
import Layout from './layout';
import HomePage from './home-page';
import PostPage from './post-page';
import NotFoundPage from './not-found-page';
import 'semantic-ui-css/semantic.min.css';
import '../styles/app.css';

export default () => (
  <Store>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:category" component={HomePage} />
          <Route exact path="/:category/:postId" component={PostPage} />
          <Route exact path="/:category/:postId/:action" component={PostPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Layout>
    </Router>
  </Store>
);
