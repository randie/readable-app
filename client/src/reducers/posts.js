import { FETCH_POSTS } from '../actions';

// redux-promise-middleware returns a new action with "_FULFillED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const FETCH_POSTS_FULFILLED = `${FETCH_POSTS}_FULFILLED`;

function posts(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_FULFILLED:
      return action.payload;
    default:
      return state;
  }
}

export default posts;
