import Client, { CATEGORIES_ENDPOINT } from '../Client';

export function fetchCategories() {
  return dispatch => Client.getRequest(CATEGORIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: 'FETCH_CATEGORIES_FULFILLED', payload: response.categories });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_CATEGORIES_REJECTED', payload: err });
    });
}
