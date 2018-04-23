import Client, { ELIGIBILITY_TYPE_ENDPOINT, ELIGIBILITIES_ENDPOINT } from './../Client';
import {
  ADD_ELIGIBILITIES,
  ADD_ELIGIBILITY_TYPE,
  FETCH_ELIGIBILITY_FULFILLED,
  FETCH_ELIGIBILITY_REJECTED,
  FETCH_ELIGIBILITY_TYPE_FULFILLED,
  DELETE_ELIGIBILITY_TYPE,
} from '../Reducers/eligibilityReducer';

export function fetchEligibilities() {
  return dispatch => Client.getRequest(ELIGIBILITIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_ELIGIBILITY_FULFILLED, payload: response });
    })
    .catch((err) => {
      dispatch({ type: FETCH_ELIGIBILITY_REJECTED, payload: err });
    });
}

export function postEligibilities(agencyId, categoryId, data) {
  return dispatch => Client.postRequest(ELIGIBILITIES_ENDPOINT, { agencyId, categoryId, data })
    .then((response) => {
      dispatch({ type: ADD_ELIGIBILITIES, payload: response });
    })
    .catch((err) => {
      dispatch({ type: FETCH_ELIGIBILITY_REJECTED, payload: err });
    });
}

export function addEligibilityType(name, comparators, valueType) {
  return dispatch => Client.postRequest(ELIGIBILITY_TYPE_ENDPOINT, { name, comparators, valueType })
    .then((response) => {
      dispatch({ type: ADD_ELIGIBILITY_TYPE, payload: response });
    })
    .catch((err) => {
      dispatch({ type: FETCH_ELIGIBILITY_REJECTED, payload: err });
    });
}

export function fetchEligibilityType() {
  return dispatch => Client.getRequest(ELIGIBILITY_TYPE_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_ELIGIBILITY_TYPE_FULFILLED, payload: response });
    })
    .catch((err) => {
      dispatch({ type: FETCH_ELIGIBILITY_REJECTED, payload: err });
    });
}

export function deleteEligibilityType(id) {
  return dispatch => Client.deleteRequest(ELIGIBILITY_TYPE_ENDPOINT, { id })
    .then((response) => {
      dispatch({ type: DELETE_ELIGIBILITY_TYPE, payload: response });
    })
    .catch((err) => {
      dispatch({ type: FETCH_ELIGIBILITY_REJECTED, payload: err });
    });
}
