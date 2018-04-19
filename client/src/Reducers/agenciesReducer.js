export const FETCH_AGENCIES = 'FETCH_AGENCIES';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const FETCH_AGENCIES_FULFILLED = 'FETCH_AGENCIES_FULFILLED';
export const FETCH_AGENCIES_DROPDOWN_FULFILLED = 'FETCH_AGENCIES_DROPDOWN_FULFILLED';
export const ADD_AGENCY = 'ADD_AGENCY';
export const UPDATE_AGENCY = 'UPDATE_AGENCY';
export const DELETE_AGENCY = 'DELETE_AGENCY';


export default function reducer(state = {
  agencies: [],
  error: null,
  dropdown: [],
}, action) {
  switch (action.type) {
    case FETCH_AGENCIES: {
      return { ...state };
    }
    case REQUEST_REJECTED: {
      return { ...state, error: action.payload };
    }
    case FETCH_AGENCIES_FULFILLED: {
      return { ...state, agencies: action.payload, error: null };
    }
    case FETCH_AGENCIES_DROPDOWN_FULFILLED: {
      const agencies_temp = action.payload;
      const dropdown_temp = agencies_temp.map(a => ({ key: a._id, value: a._id, text: a.name }));
      return { ...state, agencies: agencies_temp, dropdown: dropdown_temp, error: null };
    }
    case ADD_AGENCY: {
      return { ...state, agencies: [ ...state.agencies, action.payload ], error: null };
    }
    case UPDATE_AGENCY: {
      const id = action.payload.agency._id;
      const newAgencies = [ ...state.agencies ];
      const agencyToUpdate = newAgencies.findIndex(({ _id }) => _id === id);
      newAgencies[agencyToUpdate] = action.payload.agency;

      return { ...state, agencies: newAgencies, error: null };
    }
    case DELETE_AGENCY: {
      return { ...state, agencies: state.agencies.filter(agency => agency._id !== action.payload), error: null };
    }
  }

  return state;
}
