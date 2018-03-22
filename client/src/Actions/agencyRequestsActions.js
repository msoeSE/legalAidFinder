import Client, { AGENCY_REQUESTS_ENDPOINT } from '../Client';
import {
  FETCH_AGENCY_REQUESTS_FULFILLED,
  REQUEST_REJECTED,
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
