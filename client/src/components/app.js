import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout';
import Store from './store';

class App extends Component {
  render() {
    return (
      <Layout>
        <Store>
          <Router>
            <Switch>
              <Route exact path="/" render={this.homePage} />
              <Route path="*" render={this.notFoundPage} />
            </Switch>
          </Router>
        </Store>
      </Layout>
    );
  }

  homePage = () => <div>Home Page</div>;

  notFoundPage = () => <h2 className="app-message">404 Page not found</h2>;
}

export default App;
