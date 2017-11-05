import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_AGENCY = 'ADD_AGENCY';
export const ADD_AGENCIES = 'ADD_AGENCIES';

// Export Actions
export function addAgency(agency) {
  return {
    type: ADD_AGENCY,
    agency,
  };
}

export function addAgencyRequest(agency) {
  return (dispatch) => {
    return callApi('categories', 'agency', {
      agency: {
        name: agency.name,
        categories: agency.categories,
        _id: agency._id,
      },
    }).then(res => dispatch(addAgency(res.agency)));
  };
}

export function addAgencies(agencies) {
  return {
    type: ADD_AGENCIES,
    agencies,
  };
}

export function fetchAgencies() {
  return (dispatch) => {
    return callApi('agencies').then(res => {
      dispatch(addAgencies(res.agencies));
    });
  };
}

export function fetchAgency(_id) {
  return (dispatch) => {
    return callApi(`agencies/${_id}`).then(res => dispatch(addAgency(res.agency)));
  };
}
