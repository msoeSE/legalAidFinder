export const FETCH_AGENCY_REQUESTS = 'FETCH_AGENCY_REQUESTS';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const FETCH_AGENCY_REQUESTS_FULFILLED = 'FETCH_AGENCY_REQUESTS_FULFILLED';

export default function reducer(state = {
  requests: [],
  error: null
}, action) {
  switch (action.type) {
    case FETCH_AGENCY_REQUESTS: {
      return { ...state };
    }
    case REQUEST_REJECTED: {
      return { ...state, error: action.payload };
    }
    case FETCH_AGENCY_REQUESTS_FULFILLED: {
      return { ...state, requests: action.payload, error: null };
    }
  }

  return state;
}
