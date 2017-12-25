import api from '../utils/api';
import uuidv4 from 'uuid/v4';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export function createCommentAction({ parentId, body, author }) {
  const url = `/comments`;
  const data = {
    id: uuidv4(),
    timestamp: Date.now(),
    parentId,
    body,
    author,
  };
  const payload = api.post(url, data).then(response => response.data);
  return { type: CREATE_COMMENT, payload };
}

export function deleteCommentAction(commentId) {
  const url = `/comments/${commentId}`;
  const payload = api.delete(url).then(response => response.data);
  return { type: DELETE_COMMENT, payload };
}

export function fetchCommentsAction(postId) {
  const url = `/posts/${postId}/comments`;
  const payload = api.get(url).then(response => response.data);
  return { type: FETCH_COMMENTS, payload };
}
