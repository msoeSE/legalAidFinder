import {
  SET_USER,
  CLEAR_USER,
  UPDATE_USER_AGENCY,
} from '../Reducers/userReducer';

export function setUser(firstName, lastName, email, agency, admin) {
  return (dispatch) => {
    dispatch({ type: SET_USER, payload: { firstName, lastName, email, agency, admin } });
  };
}

export function clearUser() {
  return (dispatch) => {
    dispatch({ type: CLEAR_USER });
  };
}

export function updateAgency(agency) {
  return (dispatch) => {
    dispatch({ type: UPDATE_USER_AGENCY, payload: { agency } });
  };
}
