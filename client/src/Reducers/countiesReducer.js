export const FETCH_COUNTIES = 'FETCH_COUNTIES';
export const FETCH_COUNTIES_REJECTED = 'FETCH_COUNTIES_REJECTED';
export const FETCH_COUNTIES_FULFILLED = 'FETCH_COUNTIES_FULFILLED';
export const CHOOSE_COUNTY = 'CHOOSE_COUNTY';

export default function reducer(state = {
  counties: [],
  chosenCounty: '',
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_COUNTIES': {
      return { ...state, fetching: true };
    }
    case 'FETCH_COUNTIES_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_COUNTIES_FULFILLED': {
      const sortedCountiesList = action.payload.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) { // sort string ascending
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0; // default return value (no sorting)
      });

      return { ...state, fetching: false, fetched: true, counties: sortedCountiesList };
    }
    case 'CHOOSE_COUNTY': {
      return { ...state, chosenCounty: action.payload };
    }
  }

  return state;
}
