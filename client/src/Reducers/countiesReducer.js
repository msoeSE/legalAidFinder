export const FETCH_COUNTIES = 'FETCH_COUNTIES';
export const FETCH_COUNTIES_REJECTED = 'FETCH_COUNTIES_REJECTED';
export const FETCH_COUNTIES_FULFILLED = 'FETCH_COUNTIES_FULFILLED';
export const CHOOSE_COUNTY = 'CHOOSE_COUNTY';
export const ADD_COUNTY_TO_AGENCY = 'ADD_COUNTY_TO_AGENCY';
export const ADD_COUNTY_REJECTED = 'ADD_COUNTY_REJECTED';

export default function reducer(state = {
  counties: [],
  chosenCounty: '',
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case FETCH_COUNTIES: {
      return { ...state, fetching: true };
    }
    case FETCH_COUNTIES_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case FETCH_COUNTIES_FULFILLED: {
      return { ...state, fetching: false, fetched: true, counties: action.payload };
    }
    case CHOOSE_COUNTY: {
      return { ...state, chosenCounty: action.payload };
    }
    case ADD_COUNTY_TO_AGENCY: {
      return { ...state, agencies: [ ...state.agencies, action.payload ], error: null };
    }
    case ADD_COUNTY_REJECTED: {
      return { ...state, counties: action };
    }
  }

  return state;
}
