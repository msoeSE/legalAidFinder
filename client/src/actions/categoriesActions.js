import Client, { ADD_AGENCY_TO_CATEGORY, CATEGORIES_ENDPOINT } from '../Client';
import {
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_REJECTED,
  FETCH_CATEGORIES_DROPDOWN_FULFILLED,
  REQUEST_REJECTED,
  UPDATE_CATEGORY,
  FETCH_CATEGORIES_FULL_DROPDOWN_FULFILLED,
  ADD_CATEGORY,
  DELETE_CATEGORY, ADD_AGENCY_TO_CATEGORY_SUCCESS,
} from '../Reducers/categoriesReducer';

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

export function addCategories(data) {
  return dispatch => Client.postRequest(CATEGORIES_ENDPOINT, data)
    .then((response) => {
      dispatch({ type: ADD_CATEGORY, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function deleteCategories(id) {
  return dispatch => Client.deleteRequest(CATEGORIES_ENDPOINT, id)
    .then((response) => {
      dispatch({ type: DELETE_CATEGORY, payload: id });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function addAgencyToCategories(agencyId, categoryId, pushAgency) {
  return dispatch => Client.postRequest(ADD_AGENCY_TO_CATEGORY, { agencyId, categoryId, pushAgency })
    .then((response) => {
      dispatch({ type: ADD_AGENCY_TO_CATEGORY_SUCCESS, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}
