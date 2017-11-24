import api from '../utils/api';
import _capitalize from 'lodash/capitalize';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchCategories() {
  const payload = api
    .get('/categories')
    .then(response =>
      response.data.categories.map(category => _capitalize(category.name)),
    );
  return { type: FETCH_CATEGORIES, payload };
}
