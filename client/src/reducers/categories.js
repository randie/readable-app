import { FETCH_CATEGORIES } from '../actions/categories';

// redux-promise-middleware returns a new action with "_FULFillED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const FETCH_CATEGORIES_FULFILLED = `${FETCH_CATEGORIES}_FULFILLED`;

function categories(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES_FULFILLED:
      return action.payload;
    default:
      return state;
  }
}

export default categories;
