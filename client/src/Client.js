/* eslint-disable no-undef */

export const AGENCIES_ENDPOINT = 'agencies';
export const COUNTY_ENDPOINT = 'counties';
export const CATEGORIES_ENDPOINT = 'categories';

function getRequest(endpoint, id = null, cb) {
  let url = `${process.env.PUBLIC_URL}/api/${endpoint}`;
  if (id) {
    url += `?id=${id}`;
  }

  return fetch(url, {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function deleteRequest(endpoint, id, cb) {
  return fetch(`${process.env.PUBLIC_URL}/api/${endpoint}`, {
    method: 'delete',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function postRequest(endpoint, data, cb) {
  return fetch(`${process.env.PUBLIC_URL}/api/${endpoint}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getCategories(cb) {
  return fetch('api/categories', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function deleteCategories(id, cb) {
  return fetch('api/categories2', {
    method: 'delete',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function postCategories(data, cb) {
  return fetch('api/categories2', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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

const Client = { getRequest,
  deleteRequest,
  postRequest,
  getCategories,
  deleteCategories,
  postCategories };
export default Client;
