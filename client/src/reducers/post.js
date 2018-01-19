import { orderBy } from 'lodash';
import { CREATE_POST, DELETE_POST, EDIT_POST, FETCH_POST, VOTE_FOR_POST } from '../actions';

// redux-promise-middleware returns a new action with "_FULFILLED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const CREATE_POST_FULFILLED = `${CREATE_POST}_FULFILLED`;
const DELETE_POST_FULFILLED = `${DELETE_POST}_FULFILLED`;
const EDIT_POST_FULFILLED = `${EDIT_POST}_FULFILLED`;
const FETCH_POST_FULFILLED = `${FETCH_POST}_FULFILLED`;
const VOTE_FOR_POST_FULFILLED = `${VOTE_FOR_POST}_FULFILLED`;

function post(state = {}, action) {
  switch (action.type) {
    case CREATE_POST_FULFILLED:
      return orderBy([action.payload, ...state], ['timestamp'], ['desc']);
    case DELETE_POST_FULFILLED:
    case EDIT_POST_FULFILLED:
    case FETCH_POST_FULFILLED:
    case VOTE_FOR_POST_FULFILLED:
      return action.payload;
    default:
      return state;
  }
}

export default post;
