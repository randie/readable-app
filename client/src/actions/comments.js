import api from '../utils/api';
import uuidv4 from 'uuid/v4';

export const CREATE_COMMENT = 'ADD_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export function createCommentAction(c) {
  console.info('comment data:', c);
  debugger;
  const { parentId, body, author } = c;
  const data = {
    id: uuidv4(),
    timestamp: Date.now(),
    parentId,
    body,
    author,
  };
  const url = `/comments`;
  const payload = api.post(url, data).then(response => response.data);
  return { type: CREATE_COMMENT, payload };
}

export function fetchCommentsAction(postId) {
  const url = `/posts/${postId}/comments`;
  const payload = api.get(url).then(response => response.data);
  return { type: FETCH_COMMENTS, payload };
}
