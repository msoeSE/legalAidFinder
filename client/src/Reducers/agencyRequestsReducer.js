export const FETCH_AGENCY_REQUESTS = 'FETCH_AGENCY_REQUESTS';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';

export default function reducer(state = {
  agencies: [],
  error: null,
}, action) {
  switch (action.type) {
    case FETCH_AGENCY_REQUESTS: {
      return { ...state };
    }
    case REQUEST_REJECTED: {
      return { ...state, error: action.payload };
    }
  }

  return state;
}
