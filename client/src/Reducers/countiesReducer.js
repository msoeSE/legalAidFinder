export default function reducer(state = {
    counties: [],
    chosenCounty: "",
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case 'FETCH_COUNTIES': {
            return { ...state, fetching: true };
        }
        case 'FETCH_COUNTIES_REJECTED': {
            return { ...state, fetching: false, error: action.payload };
        }
        case 'FETCH_COUNTIES_FULFILLED': {
            return { ...state, fetching: false, fetched: true, counties: action.payload };
        }
        case 'CHOOSE_COUNTY': {
            return { ...state, chosenCounty: action.payload };
        }
    }

    return state;
}
