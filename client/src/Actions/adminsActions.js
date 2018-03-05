import Client, { ADMINS_ENDPOINT } from '../Client';
import {
  REQUEST_REJECTED,
  FETCH_ADMINS_FULFILLED,
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
