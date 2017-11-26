import api from '../utils/api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const SORT_POSTS = 'SORT_POSTS';

export function fetchPosts(category) {
  const urlPath = !category ? '/posts' : `/${category}/posts`;
  const payload = api.get(urlPath).then(response => response.data);
  return { type: FETCH_POSTS, payload };
}

export function sortPosts(sortBy) {
  return { type: SORT_POSTS, sortBy };
}
