import api from '../utils/api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const SORT_POSTS = 'SORT_POSTS';

export function fetchPostsAction(category) {
  const url = !category || category === 'all' ? '/posts' : `/${category}/posts`;
  const payload = api.get(url).then(response => response.data);
  return { type: FETCH_POSTS, payload };
}

export function sortPostsAction(sortBy, order) {
  return { type: SORT_POSTS, sortBy, order };
}
