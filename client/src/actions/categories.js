import api from '../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchCategories() {
  const payload = api
    .get('/categories')
    .then(response => response.data.categories);
  return { type: FETCH_CATEGORIES, payload };
}
