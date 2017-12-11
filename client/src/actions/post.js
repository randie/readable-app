import api from '../utils/api';

export const FETCH_POST = 'FETCH_POST';

export function fetchPost(postId) {
  const urlPath = `/posts/${postId}`;
  const payload = api.get(urlPath).then(response => response.data);
  return { type: FETCH_POST, payload };
}
