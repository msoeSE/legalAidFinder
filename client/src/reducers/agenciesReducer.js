export default function reducer(state = {
    agencies: [],
    error: null,
    dropdown: []
  }, action) {

    switch (action.type) {
      case 'FETCH_AGENCIES': {
        return { ...state };
      }
      case 'REQUEST_REJECTED': {
        return { ...state, error: action.payload };
      }
      case 'FETCH_AGENCIES_FULFILLED': {
        return { ...state, agencies: action.payload };
      }
      case 'FETCH_AGENCIES_DROPDOWN_FULFILLED': {
        let agencies_temp = action.payload;
        let dropdown_temp = agencies_temp.map((a) => {return {key: a._id, value: a._id, text: a.name}});
        return { ...state, agencies: agencies_temp, dropdown: dropdown_temp };
      }
      case 'ADD_AGENCY': {
        return { ...state, agencies: [ ...state.agencies, action.payload ] };
      }
      case 'UPDATE_AGENCY': {
        const { id } = action.payload;
        const newAgencies = [...state.agencies];
        const agencyToUpdate = newAgencies.findIndex(agency => agency._id === id)
        newAgencies[agencyToUpdate] = action.payload;
  
        return { ...state, agencies: newAgencies };
      }
      case 'DELETE_AGENCY': {
        return { ...state, agencies: state.agencies.filter(agency => agency._id !== action.payload) };
      }
    }
  
    return state;
  }
  