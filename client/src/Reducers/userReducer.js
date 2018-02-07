export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export default function reducer(state = {
  firstName: null,
  lastName: null,
  email: null,
  agency: null,
  admin: false,
  error: null,
}, action) {
  switch (action.type) {
    case CLEAR_USER: {
      return { ...state, firstName: null, lastName: null, email: null, agency: null, admin: null, error: null };
    }
    case SET_USER: {
      return { ...state, firstName: action.payload.firstName, lastName: action.payload.lastName,
        email: action.payload.email, agency: action.payload.agency, admin: action.payload.admin, error: null };
    }
  }

  return state;
}
