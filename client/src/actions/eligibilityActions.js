export function fetchEligibilities() {
  return dispatch => fetch(`${process.env.PUBLIC_URL}api/eligibilities`, {
    accept: 'application/json',
  }).then(parseJSON)
    .then((response) => {
      dispatch({ type: 'FETCH_ELIGIBILITY_FULFILLED', payload: response.eligibilities });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ELIGIBILITY_REJECTED', payload: err });
    });
}


function parseJSON(response) {
  return response.json();
}
