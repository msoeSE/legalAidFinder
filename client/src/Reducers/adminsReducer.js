export const FETCH_ADMINS = 'FETCH_ADMINS';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const FETCH_ADMINS_FULFILLED = 'FETCH_ADMINS_FULFILLED';
export const ADD_ADMIN = 'ADD_ADMIN';
export const DELETE_ADMIN = 'DELETE_ADMIN';
export const FETCH_ADMINS_DROPDOWN_FULFILLED = 'FETCH_ADMINS_DROPDOWN_FULFILLED';

export default function reducer(state = {
  admins: [],
  error: null,
}, action) {
  switch (action.type) {
    case FETCH_ADMINS: {
      return { ...state };
    }
    case REQUEST_REJECTED: {
      return { ...state, error: action.payload };
    }
    case FETCH_ADMINS_FULFILLED: {
      return { ...state, admins: action.payload, error: null };
    }
    case ADD_ADMIN: {
      return { ...state, admins: [ ...state.admins, action.payload.admin ], error: null };
    }
    case DELETE_ADMIN: {
      return { ...state, admins: state.admins.filter(admin => admin._id !== action.payload), error: null };
    }
    case FETCH_ADMINS_DROPDOWN_FULFILLED: {
      const admins_temp = action.payload;
      const dropdown_temp = admins_temp.map(a => ({ key: a._id, value: a._id, text: a.email }));
      return { ...state, admins: admins_temp, dropdown: dropdown_temp, error: null };
    }
  }

  return state;
}
