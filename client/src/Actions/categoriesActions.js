import Client, { CATEGORIES_ENDPOINT } from '../Client';
import { FETCH_CATEGORIES_FULFILLED, FETCH_CATEGORIES_REJECTED } from '../reducers/categoriesReducer';

export function fetchCategories() {
  return dispatch => Client.getRequest(CATEGORIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_CATEGORIES_FULFILLED, payload: response.categories });
    })
    .catch((err) => {
      dispatch({ type: FETCH_CATEGORIES_REJECTED, payload: err });
    });
}
