/* eslint-disable no-undef */
function getCategories(cb) {
  return fetch('api/categories', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getAgencies(cb) {
  return fetch('api/agencies', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function postAgencies(data, cb) {
  return fetch('api/agencies', {
    accept: 'application/json',
    method: 'POST',
    body: data
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { getCategories, getAgencies, postAgencies };
export default Client;
