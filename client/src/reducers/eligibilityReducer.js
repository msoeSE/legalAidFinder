export default function reducer(state = {
  eligibility: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case 'FETCH_ELIGIBILITY': {
      return {...state, fetching: true};
    }
    case 'FETCH_ELIGIBILITY_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_ELIGIBILITY_FULFILLED': {
      return {...state, fetching: false, fetched: true, counties: action.payload};
    }
    case 'ADD_ELIGIBILITY': {
      return {...state, eligibility: action.eligibility};
    }
    case 'ADD_ELIBILITIES': {
      return {...state, eligibility: action.eligibilities};
    }
  }
  return state;
}

// Initial State
const initialState = { data: [] };

const EligibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ELIGIBILITY:
      return {
        data: [action.eligibility, ...state.data],
      };

    case ADD_ELIGIBILITIES:
      return {
        data: action.eligibilities,
      };

    case DELETE_ELIGIBILITY:
      return {
        data: state.data.filter(eligibility => eligibility._id !== action._id),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all categories
export const getEligibilities = (state, _id) => state.categories.data.filter(category => category._id === _id);

// Get category by id
export const getEligibility = (state, _id) => state.categories.data.filter(category => category._id === _id)[0];

// Export Reducer
export default EligibilityReducer;
