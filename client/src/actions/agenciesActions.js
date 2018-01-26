export function fetchAgencies() {
    return dispatch => fetch(`${process.env.PUBLIC_URL}/api/agencies`, {
      accept: 'application/json',
    }).then(parseJSON)
        .then((response) => {
          dispatch({ type: 'FETCH_AGENCIES_FULFILLED', payload: response.agencies });
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_REJECTED', payload: err });
        });
  }

  export function fetchAgenciesAndDropdown() {
    return dispatch => fetch(`${process.env.PUBLIC_URL}/api/agencies`, {
      accept: 'application/json',
    }).then(parseJSON)
        .then((response) => {
          dispatch({ type: 'FETCH_AGENCIES_DROPDOWN_FULFILLED', payload: response.agencies });
        })
        .catch((err) => {
          dispatch({ type: 'REQUEST_REJECTED', payload: err });
        });
  }

  export function deleteAgencies(id) {
    return dispatch => fetch(`${process.env.PUBLIC_URL}/api/agencies`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id),
    })
      .then(parseJSON)
        .then((response) => {
            dispatch({ type: 'DELETE_AGENCY', payload: id });
        })
        .catch((err) => {
            dispatch({ type: 'REQUEST_REJECTED', payload: err });
        });      
  }

  export function addAgencies(data) {
    return dispatch => fetch(`${process.env.PUBLIC_URL}/api/agencies`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(parseJSON)
        .then((response) => {
            dispatch({ type: 'ADD_AGENCY', payload: response });
        })
        .catch((err) => {
            dispatch({ type: 'REQUEST_REJECTED', payload: err });
        });      
  }

  export function modifyAgencies(data) {
    return dispatch => fetch(`${process.env.PUBLIC_URL}/api/agencies`, {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(parseJSON)
        .then((response) => {
            dispatch({ type: 'UPDATE_AGENCY', payload: response });
        })
        .catch((err) => {
            dispatch({ type: 'REQUEST_REJECTED', payload: err });
        });      
  }
  
  function parseJSON(response) {
    return response.json();
  }
  