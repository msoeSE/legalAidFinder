export const FETCH_ELIGIBILITY = 'FETCH_ELIGIBILITY';
export const FETCH_ELIGIBILITY_REJECTED = 'FETCH_ELIGIBILITY_REJECTED';
export const FETCH_ELIGIBILITY_FULFILLED = 'FETCH_ELIGIBILITY_FULFILLED';
export const ADD_ELIGIBILITIES = 'ADD_ELIGIBILITIES';
export const DELETE_ELIGIBILITY = 'DELETE_ELIGIBILITY';

export default function reducer(state = {
  eligibility: [],
  error: null,
}, action) {
  switch (action.type) {
    case FETCH_ELIGIBILITY: {
      return { ...state };
    }
    case FETCH_ELIGIBILITY_REJECTED: {
      return { ...state, error: action.payload };
    }
    case FETCH_ELIGIBILITY_FULFILLED: {
      return { ...state, eligibility: action.payload, error: null };
    }
    case ADD_ELIGIBILITIES: {
      return { ...state, eligibility: [ ...state.eligibility, action.payload ], error: null };
    }
    case DELETE_ELIGIBILITY:
      return { ...state, eligibility: this.eligibility.filter(e => e._id !== action._id), error: null };
  }
  return state;
}

/* Selectors */

// Get all categories
export const getEligibilities = (state, agencyId, categoryId) => state.eligibility.filter(e => e.agency === agencyId && e.category === categoryId);

// Get eligibilities for a category
export const getCategoryEligibilities = (state, categoryId) => state.eligibility.filter(e => e.category === categoryId);

// Get category by id
export const getEligibility = (state, agencyId, categoryId) => state.eligibility.filter(e => e.agency === agencyId && e.category === categoryId)[0];
