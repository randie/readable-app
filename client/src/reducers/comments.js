import { CREATE_COMMENT, FETCH_COMMENTS } from '../actions';

// redux-promise-middleware returns a new action with "_FULFILLED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const CREATE_COMMENT_FULFILLED = `${CREATE_COMMENT}_FULFILLED`;
const FETCH_COMMENTS_FULFILLED = `${FETCH_COMMENTS}_FULFILLED`;

function comments(state = [], action) {
  switch (action.type) {
    case CREATE_COMMENT_FULFILLED:
      debugger;
      const r = [...state, action.payload];
      return r;
    case FETCH_COMMENTS_FULFILLED:
      return action.payload;
    default:
      return state;
  }
}

export default comments;
