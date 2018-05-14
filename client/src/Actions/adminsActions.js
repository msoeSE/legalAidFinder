import Client, { ADMINS_ENDPOINT } from '../Client';
import {
  REQUEST_REJECTED,
  FETCH_ADMINS_FULFILLED,
  ADD_ADMIN, DELETE_ADMIN, FETCH_ADMINS_DROPDOWN_FULFILLED,
} from '../Reducers/adminsReducer';

export function fetchAdmins() {
  return dispatch => Client.getRequest(ADMINS_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_ADMINS_FULFILLED, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function addAdmin(data) {
  return dispatch => Client.postRequest(ADMINS_ENDPOINT, data)
    .then((response) => {
      dispatch({ type: ADD_ADMIN, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function deleteAdmin(id) {
  return dispatch => Client.deleteRequest(ADMINS_ENDPOINT, id)
    .then((response) => {
      dispatch({ type: DELETE_ADMIN, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function fetchAdminsAndDropdown() {
  return dispatch => Client.getRequest(ADMINS_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_ADMINS_DROPDOWN_FULFILLED, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}
