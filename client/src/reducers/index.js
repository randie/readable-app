import { combineReducers } from 'redux';
import categories from './categories';
import comments from './comments';
import posts from './posts';
import post from './post';

export default combineReducers({ categories, comments, posts, post });
