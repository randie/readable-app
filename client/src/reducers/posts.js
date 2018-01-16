import { orderBy } from 'lodash';
import { CREATE_POST, FETCH_POSTS, SORT_POSTS } from '../actions';

// redux-promise-middleware returns a new action with "_FULFILLED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const CREATE_POST_FULFILLED = `${CREATE_POST}_FULFILLED`;
const FETCH_POSTS_FULFILLED = `${FETCH_POSTS}_FULFILLED`;

function posts(state = [], action) {
  switch (action.type) {
    case CREATE_POST_FULFILLED:
      return orderBy([action.payload, ...state], ['timestamp'], ['desc']);

    case FETCH_POSTS_FULFILLED:
      return orderBy(action.payload, ['timestamp'], ['desc']);

    case SORT_POSTS:
      return orderBy([...state], [action.sortBy], ['desc']);

    default:
      return state;
  }
}

export default posts;
