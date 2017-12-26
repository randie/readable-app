import { findIndex, orderBy } from 'lodash';
import { CREATE_COMMENT, DELETE_COMMENT, FETCH_COMMENTS, VOTE_FOR_COMMENT } from '../actions';

// redux-promise-middleware returns a new action with "_FULFILLED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const CREATE_COMMENT_FULFILLED = `${CREATE_COMMENT}_FULFILLED`;
const DELETE_COMMENT_FULFILLED = `${DELETE_COMMENT}_FULFILLED`;
const FETCH_COMMENTS_FULFILLED = `${FETCH_COMMENTS}_FULFILLED`;
const VOTE_FOR_COMMENT_FULFILLED = `${VOTE_FOR_COMMENT}_FULFILLED`;

function comments(state = [], action) {
  switch (action.type) {
    case CREATE_COMMENT_FULFILLED:
      return orderBy([action.payload, ...state], ['timestamp'], ['desc']);

    case DELETE_COMMENT_FULFILLED:
      return state.filter(comment => comment.id !== action.payload.id);

    case FETCH_COMMENTS_FULFILLED:
      return orderBy(action.payload, ['timestamp'], ['desc']);

    case VOTE_FOR_COMMENT_FULFILLED:
      const newState = [...state];
      const index = findIndex(newState, item => item.id === action.payload.id);
      newState[index] = action.payload;
      return newState;

    default:
      return state;
  }
}

export default comments;
