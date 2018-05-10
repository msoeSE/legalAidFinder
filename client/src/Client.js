/* eslint-disable no-undef */

export const AGENCIES_ENDPOINT = 'agency';
export const COUNTY_ENDPOINT = 'county';
export const CATEGORIES_ENDPOINT = 'category';
export const ADD_AGENCY_TO_CATEGORY = 'category/agency';
export const ELIGIBILITIES_ENDPOINT = 'eligibility';
export const ELIGIBILITY_TYPE_ENDPOINT = 'eligibilityType';
export const ADMINS_ENDPOINT = 'admin';
export const AGENCY_REQUESTS_ENDPOINT = 'agencyrequests';
//const LAMBDA_URL = 'https://c82fzxf28g.execute-api.us-east-1.amazonaws.com/prod/';
const LAMBDA_URL = 'http://localhost:3001/';

function getRequest(endpoint, id = null, cb) {
  let url = LAMBDA_URL + endpoint;
  if (id) {
    url += `?id=${id}`;
  }
  return fetch(url, {
    accept: 'application/json',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    // mode: 'cors'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function deleteRequest(endpoint, id, cb) {
  let url = LAMBDA_URL + endpoint;
  return fetch(url, {
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
  let url = LAMBDA_URL + endpoint;
  return fetch(url, {
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

function putRequest(endpoint, data, cb) {
  let url = LAMBDA_URL + endpoint;
  return fetch(url, {
    method: 'put',
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

const Client = {
  getRequest,
  deleteRequest,
  postRequest,
  putRequest,
};

export default Client;