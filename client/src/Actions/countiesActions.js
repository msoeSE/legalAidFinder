import Client, { COUNTY_ENDPOINT } from '../Client';
import { FETCH_COUNTIES_FULFILLED, FETCH_COUNTIES_REJECTED } from '../Reducers/countiesReducer';

export function fetchCounties() {
  return dispatch => Client.getRequest(COUNTY_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_COUNTIES_FULFILLED, payload: response.counties });
    })
    .catch((err) => {
      dispatch({ type: FETCH_COUNTIES_REJECTED, payload: err });
    });
}

export function chooseCounty(county) {
  return dispatch => dispatch({ type: 'CHOOSE_COUNTY', payload: county });
}
