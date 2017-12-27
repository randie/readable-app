import api from '../utils/api';

export const DELETE_POST = 'DELETE_POST';
export const FETCH_POST = 'FETCH_POST';
export const VOTE_FOR_POST = 'VOTE_FOR_POST';

export function deletePostAction(postId) {
  const url = `/posts/${postId}`;
  const payload = api.delete(url).then(response => response.data);
  return { type: DELETE_POST, payload };
}

export function fetchPostAction(postId) {
  const url = `/posts/${postId}`;
  const payload = api.get(url).then(response => response.data);
  return { type: FETCH_POST, payload };
}

export function voteForPostAction(postId, voteType) {
  const url = `/posts/${postId}`;
  const option = { option: voteType };
  const payload = api.post(url, option).then(response => response.data);
  return { type: VOTE_FOR_POST, payload };
}