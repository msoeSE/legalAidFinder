export function fetchEligibility() {
  return function (dispatch) {
    return fetch('api/eligibility', {
      accept: 'application/json',
    }).then(parseJSON)
      .then((response) => {
        dispatch({ type: 'FETCH_ELIGIBILITY_FULFILLED', payload: response.counties });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ELIGIBILITY_REJECTED', payload: err });
      });
  };
}

function parseJSON(response) {
  return response.json();
}