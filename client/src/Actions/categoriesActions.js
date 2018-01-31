import Client, { CATEGORIES_ENDPOINT } from '../Client';
import { FETCH_CATEGORIES_FULFILLED,
         FETCH_CATEGORIES_REJECTED, 
         FETCH_CATEGORIES_DROPDOWN_FULFILLED,
         REQUEST_REJECTED,
         UPDATE_CATEGORY, 
         FETCH_CATEGORIES_FULL_DROPDOWN_FULFILLED} from '../reducers/categoriesReducer';

export function fetchCategories() {
  return dispatch => Client.getRequest(CATEGORIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_CATEGORIES_FULFILLED, payload: response.categories });
    })
    .catch((err) => {
      dispatch({ type: FETCH_CATEGORIES_REJECTED, payload: err });
    });
}

export function fetchCategoriesAndDropdown() {
  return dispatch => Client.getRequest(CATEGORIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_CATEGORIES_DROPDOWN_FULFILLED, payload: response.categories });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function fetchCategoriesAndFullDropdown() {
  return dispatch => Client.getRequest(CATEGORIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_CATEGORIES_FULL_DROPDOWN_FULFILLED, payload: response.categories });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function modifyCategories(data) {
  return dispatch => Client.putRequest(CATEGORIES_ENDPOINT, data)
    .then((response) => {
      dispatch({ type: UPDATE_CATEGORY, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}
