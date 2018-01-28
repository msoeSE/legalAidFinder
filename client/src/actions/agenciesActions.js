import Client, { AGENCIES_ENDPOINT } from '../Client';

export function fetchAgencies() {
  return dispatch => Client.getRequest(AGENCIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: 'FETCH_AGENCIES_FULFILLED', payload: response.agencies });
    })
    .catch((err) => {
      dispatch({ type: 'REQUEST_REJECTED', payload: err });
    });
}

export function fetchAgenciesAndDropdown() {
  return dispatch => Client.getRequest(AGENCIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: 'FETCH_AGENCIES_DROPDOWN_FULFILLED', payload: response.agencies });
    })
    .catch((err) => {
      dispatch({ type: 'REQUEST_REJECTED', payload: err });
    });
}

export function deleteAgencies(id) {
  return dispatch => Client.deleteRequest(AGENCIES_ENDPOINT, id)
    .then((response) => {
      dispatch({ type: 'DELETE_AGENCY', payload: id });
    })
    .catch((err) => {
      dispatch({ type: 'REQUEST_REJECTED', payload: err });
    });
}

export function addAgencies(data) {
  return dispatch => Client.postRequest(AGENCIES_ENDPOINT, data)
    .then((response) => {
      dispatch({ type: 'ADD_AGENCY', payload: response });
    })
    .catch((err) => {
      dispatch({ type: 'REQUEST_REJECTED', payload: err });
    });
}

export function modifyAgencies(data) {
  return dispatch => Client.postRequest(AGENCIES_ENDPOINT, data)
    .then((response) => {
      dispatch({ type: 'UPDATE_AGENCY', payload: response });
    })
    .catch((err) => {
      dispatch({ type: 'REQUEST_REJECTED', payload: err });
    });
}
