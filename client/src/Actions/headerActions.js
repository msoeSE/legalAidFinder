import Client, {HEADER_ENDPOINT} from '../Client';
import {
    UPDATE_HEADER,
    FETCH_HEADER_REJECTED,
    FETCH_HEADER_FULFILLED,
    REQUEST_REJECTED
} from '../Reducers/headerReducer';

export function fetchHeader() {
    return dispatch => Client.getRequest(HEADER_ENDPOINT)
        .then((response) => {
            dispatch({ type: FETCH_HEADER_FULFILLED, payload: response });
        })
        .catch((err) => {
            dispatch({ type: FETCH_HEADER_REJECTED, payload: err });
        });
}

export function updateHeader(header){
    return dispatch => Client.putRequest(HEADER_ENDPOINT, {header})
        .then((response) => {
            dispatch({ type: UPDATE_HEADER, payload: response });
        })
        .catch((err) => {
            dispatch({ type: REQUEST_REJECTED, payload: err });
        });
}
