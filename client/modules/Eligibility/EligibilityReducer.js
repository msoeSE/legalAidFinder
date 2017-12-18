import { ADD_ELIGIBILITY, ADD_ELIGIBILITIES, DELETE_ELIGIBILITY } from './EligibilityActions';

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
