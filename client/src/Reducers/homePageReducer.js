export const FETCH_HOME_INFO = 'FETCH_HOME_INFO';
export const FETCH_HOME_INFO_REJECTED = 'FETCH_HOME_INFO_REJECTED';
export const FETCH_HOME_INFO_FULFILLED = 'FETCH_HOME_INFO_FULFILLED';
export const UPDATE_HOMEPAGE = 'UPDATE_HOMEPAGE';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';

export default function reducer(state = { // TODO: Header stuff
    title: '',
    description: '',
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case FETCH_HOME_INFO: {
            return {...state, fetching: true};
        }
        case FETCH_HOME_INFO_REJECTED: {
            return {...state, fetching: false, error: action.payload};
        }
        case FETCH_HOME_INFO_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                title: action.payload.title,
                description: action.payload.description
            };
        }
        case REQUEST_REJECTED: {
            return { ...state, error: action.payload };
        }
        case UPDATE_HOMEPAGE: {
            // TODO: Implement this case, might not need to do anything else
            return { ...state, title: action.payload.title, description: action.payload.description };
        }
    }

    return state;
}
