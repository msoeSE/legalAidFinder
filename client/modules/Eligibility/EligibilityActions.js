import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_ELIGIBILITY = 'ADD_ELIGIBILITY';
export const ADD_ELIGIBILITIES = 'ADD_ELIGIBILITIES';
export const DELETE_ELIGIBILITY = 'DELETE_ELIGIBILITY';

// Export Actions
export function addEligibility(eligibility) {
  return {
    type: ADD_ELIGIBILITY,
    eligibility,
  };
}

export function addEligibilityRequest(eligibility) {
  return (dispatch) => {
    return callApi(
      'eligibility',
      'post',
      // eligibility: {
      //   name: eligibility.name,
      //   parent: category.parent,
      //   subcategories: category.subcategories,
      //   _id: category._id,
      // },
      eligibility
    ).then(res => dispatch(addEligibility(res.eligibility)));
  };
}

export function addEligibilities(eligibilities) {
  return {
    type: ADD_ELIGIBILITIES,
    eligibilities,
  };
}

export function fetchEligibilities(_id) {
  return (dispatch) => {
    return callApi(`agency_eligibities/${_id}`).then((res) => {
      dispatch(addEligibilities(res.eligibilities));
    });
  };
}

export function fetchEligibility(_id) {
  return (dispatch) => {
    return callApi(`eligibility/${_id}`).then(res => dispatch(addEligibility(res.eligibility)));
  };
}

export function deleteEligibility(_id) {
  return {
    type: DELETE_ELIGIBILITY,
    _id,
  };
}

export function deleteEligibilityRequest(_id) {
  return (dispatch) => {
    return callApi(`eligibility/${_id}`, 'delete').then(() => dispatch(deleteEligibility(_id)));
  };
}
