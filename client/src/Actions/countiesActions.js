import Client, { COUNTY_ENDPOINT, ADD_AGENCY_TO_CATEGORY } from '../Client';
import { FETCH_COUNTIES_FULFILLED, FETCH_COUNTIES_REJECTED, ADD_COUNTY_REJECTED, ADD_COUNTY_TO_AGENCY } from '../Reducers/countiesReducer';

export function fetchCounties() {
  return dispatch => Client.getRequest(COUNTY_ENDPOINT)
    .then((response) => {
      dispatch({ type: FETCH_COUNTIES_FULFILLED, payload: response });
    })
    .catch((err) => {
      dispatch({ type: FETCH_COUNTIES_REJECTED, payload: err });
    });
}

export function addCountyToAgency(agencyId, countyName, pushCounty) {
  return dispatch => Client.postRequest(COUNTY_ENDPOINT, { agencyId, countyName, pushCounty })
    .then((response) => {
      dispatch({ type: ADD_COUNTY_TO_AGENCY, payload: response });
    })
    .catch((err) => {
      // dispatch({ type: ADD_COUNTY_REJECTED, payload: err });
    });
}

export function chooseCounty(county) {
  return dispatch => dispatch({ type: 'CHOOSE_COUNTY', payload: county });
}
