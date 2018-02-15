import Client, { ELIGIBILITIES_ENDPOINT, ADD_ELIGIBILITY } from './../Client';
import {
  ADD_ELIGIBILITIES,
  FETCH_ELIGIBILITY_FULFILLED,
  FETCH_ELIGIBILITY_REJECTED,
} from '../Reducers/eligibilityReducer';

export function fetchEligibilities() {
  return dispatch => Client.getRequest(ELIGIBILITIES_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_ELIGIBILITY_FULFILLED, payload: response.eligibilities });
    })
    .catch((err) => {
      dispatch({ type: FETCH_ELIGIBILITY_REJECTED, payload: err });
    });
}

export function postEligibilities(agencyId, categoryId, data) {
  return dispatch => Client.postRequest(ADD_ELIGIBILITY, { agencyId, categoryId, data })
    .then((response) => {
      dispatch({ type: ADD_ELIGIBILITIES, payload: response.eligibilities });
    })
    .catch((err) => {
      dispatch({ type: FETCH_ELIGIBILITY_REJECTED, payload: err });
    });
}