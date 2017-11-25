import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise-middleware';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxPromise())),
);

export default props => <Provider store={store}>{props.children}</Provider>;

// TODO: For debugging only. Remove later.
window.store = store;
