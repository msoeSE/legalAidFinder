import {
  SET_USER,
  CLEAR_USER,
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
