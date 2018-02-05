import {
  SET_USER,
  CLEAR_USER,
} from '../Reducers/userReducer';

export function setUser(email, agency, admin) {
  return (dispatch) => {
    dispatch({ type: SET_USER, payload: { email, agency, admin } });
  };
}

export function clearUser() {
  return (dispatch) => {
    dispatch({ type: CLEAR_USER });
  };
}
