import api from '../utils/api';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export function fetchCommentsAction(postId) {
  const url = `/posts/${postId}/comments`;
  const payload = api.get(url).then(response => response.data);
  return { type: FETCH_COMMENTS, payload };
}
