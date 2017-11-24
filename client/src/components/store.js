import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
//import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise-middleware';
import combinedReducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = applyMiddleware(reduxPromise())(createStore)(combinedReducers);
const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(reduxPromise())),
);

export default props => <Provider store={store}>{props.children}</Provider>;
