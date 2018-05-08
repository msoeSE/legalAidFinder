import Client, { HOME_PAGE_ENDPOINT } from '../Client';
import {
    FETCH_HOME_INFO_FULFILLED,
    FETCH_HOME_INFO_REJECTED,
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
