import { CREATE_COMMENT, DELETE_COMMENT, FETCH_COMMENTS } from '../actions';

// redux-promise-middleware returns a new action with "_FULFILLED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const CREATE_COMMENT_FULFILLED = `${CREATE_COMMENT}_FULFILLED`;
const DELETE_COMMENT_FULFILLED = `${DELETE_COMMENT}_FULFILLED`;
const FETCH_COMMENTS_FULFILLED = `${FETCH_COMMENTS}_FULFILLED`;

function comments(state = [], action) {
  switch (action.type) {
    case CREATE_COMMENT_FULFILLED:
      return [...state, action.payload];
    case DELETE_COMMENT_FULFILLED:
      return state.filter(comment => comment.id !== action.payload.id);
    case FETCH_COMMENTS_FULFILLED:
      return action.payload;
    default:
      return state;
  }
}

export default comments;
