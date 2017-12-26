import uuidv4 from 'uuid/v4';
import api from '../utils/api';

export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const SORT_POSTS = 'SORT_POSTS';

export function createPostAction(post) {
  const url = '/posts';
  const data = { id: uuidv4(), timestamp: Date.now(), ...post };
  const payload = api.post(url, data).then(response => response.data);
  return { type: CREATE_POST, payload };
}

export function fetchPostsAction(category) {
  const url = !category ? '/posts' : `/${category}/posts`;
  const payload = api.get(url).then(response => response.data);
  return { type: FETCH_POSTS, payload };
}

export function sortPostsAction(sortBy) {
  return { type: SORT_POSTS, sortBy };
}
