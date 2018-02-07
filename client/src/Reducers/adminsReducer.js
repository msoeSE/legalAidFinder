export const FETCH_ADMINS = 'FETCH_ADMINS';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const FETCH_ADMINS_FULFILLED = 'FETCH_ADMINS_FULFILLED';

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
  }

  return state;
}
