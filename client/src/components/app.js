import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" render={this.homePage} />
            <Route render={this.notFoundPage} />
          </Switch>
        </Router>
      </Layout>
    );
  }

  homePage = () => <div>Home Page</div>;

  notFoundPage = () => <h2 className="app-message">404 Page not found</h2>;
}

export default App;
