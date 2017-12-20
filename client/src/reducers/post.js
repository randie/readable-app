import { DELETE_POST, FETCH_POST, VOTE_FOR_POST } from '../actions';

// redux-promise-middleware returns a new action with "_FULFillED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const DELETE_POST_FULFILLED = `${DELETE_POST}_FULFILLED`;
const FETCH_POST_FULFILLED = `${FETCH_POST}_FULFILLED`;
const VOTE_FOR_POST_FULFILLED = `${VOTE_FOR_POST}_FULFILLED`;

function post(state = {}, action) {
  switch (action.type) {
    case DELETE_POST_FULFILLED:
    case FETCH_POST_FULFILLED:
    case VOTE_FOR_POST_FULFILLED:
      return action.payload;
    default:
      return state;
  }
}

export default post;
