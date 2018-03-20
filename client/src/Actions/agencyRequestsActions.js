import Client, { AGENCY_REQUESTS_ENDPOINT } from '../Client';
import {
  FETCH_AGENCY_REQUESTS,
  REQUEST_REJECTED,
} from '../Reducers/agencyRequestsReducer';

export function fetchAgencies() {
  return dispatch => Client.getRequest(AGENCY_REQUESTS_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_AGENCY_REQUESTS, payload: response });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_REJECTED, payload: err });
    });
}
