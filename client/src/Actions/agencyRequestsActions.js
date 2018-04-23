import Client, { AGENCY_REQUESTS_ENDPOINT } from '../Client';
import {
  FETCH_AGENCY_REQUESTS_FULFILLED,
  REQUEST_REJECTED,
  ADD_AGENCY_REQUEST,
  DELETE_AGENCY_REQUEST,
} from '../Reducers/agencyRequestsReducer';

export function fetchAgencyRequests() {
  return dispatch => Client.getRequest(AGENCY_REQUESTS_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_AGENCY_REQUESTS_FULFILLED, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function deleteAgencyRequests(id) {
  return dispatch => Client.deleteRequest(AGENCY_REQUESTS_ENDPOINT, id)
    .then((response) => {
      dispatch({ type: DELETE_AGENCY_REQUEST, payload: id });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}

export function addAgencyRequests(data) {
  return dispatch => Client.postRequest(AGENCY_REQUESTS_ENDPOINT, data)
    .then((response) => {
      dispatch({ type: ADD_AGENCY_REQUEST, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}
