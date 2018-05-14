export const FETCH_HEADER = 'FETCH_HEADER';
export const FETCH_HEADER_REJECTED = 'FETCH_HEADER_REJECTED';
export const FETCH_HEADER_FULFILLED = 'FETCH_HEADER_FULFILLED';
export const UPDATE_HEADER = 'UPDATE_HEADER';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';

export default function reducer(state = {
    header: '',
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case FETCH_HEADER: {
            return {...state, fetching: true};
        }
        case FETCH_HEADER_REJECTED: {
            return {...state, fetching: false, error: action.payload};
        }
        case FETCH_HEADER_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                header: action.payload.header
            };
        }
        case REQUEST_REJECTED: {
            return { ...state, error: action.payload };
        }
        case UPDATE_HEADER: {
            return { ...state, header: action.payload.header };
        }
    }

    return state;
}
