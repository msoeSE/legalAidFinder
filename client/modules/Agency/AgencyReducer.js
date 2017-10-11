import { ADD_AGENCY, ADD_AGENCIES } from './AgencyActions';

// Initial State
const initialState = { data: [] };

const AgencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AGENCY :
      return {
        data: [action.agency, ...state.data],
      };

    case ADD_AGENCIES :
      return {
        data: action.agencies,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all categories
export const getAgencies = state => state.agencies.data;

// Get category by id
export const getAgency = (state, _id) => state.agencies.data.filter(agency => agency._id === _id)[0];

// Export Reducer
export default AgencyReducer;
