import Client, {HOME_PAGE_ENDPOINT} from '../Client';
import {
    FETCH_HOME_INFO_FULFILLED,
    FETCH_HOME_INFO_REJECTED,
    UPDATE_HOMEPAGE,
    REQUEST_REJECTED
} from '../Reducers/homePageReducer.js';

export function fetchTitleAndDescription() { // TODO: Do all the setTitle, setDescription stuff
    return dispatch => Client.getRequest(HOME_PAGE_ENDPOINT)
        .then((response) => {
            dispatch({ type: FETCH_HOME_INFO_FULFILLED, payload: response });
        })
        .catch((err) => {
            dispatch({ type: FETCH_HOME_INFO_REJECTED, payload: err });
        });
}

export function updateTitleAndDescription(title, description){
    return dispatch => Client.putRequest(HOME_PAGE_ENDPOINT, {title, description})
        .then((response) => {
            dispatch({ type: UPDATE_HOMEPAGE, payload: response });
        })
        .catch((err) => {
            dispatch({ type: REQUEST_REJECTED, payload: err });
        });
}
