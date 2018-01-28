import reducer from '../../src/reducers/categoriesReducer';


const DEFAULT_STATE = {
    categories: [],
    fetching: false,
    fetched: false,
    error: null,
};

describe('Categories Reducer', () =>{

    it('has a default state', () => {

        expect(reducer(undefined, {
            type: 'unexpected'
        })).toEqual(DEFAULT_STATE); // Passing in undefined defaults to the
                                    // reducer's default state

    });

    it('can begin fetching categories', () => {
        expect(reducer(undefined, {
            type: 'FETCH_CATEGORIES',
            payload: {}
        })).toEqual({ ...DEFAULT_STATE, fetching: true});
    });

    it('can succeed fetching categories', () =>{
        const categoryPayload = ['Health', 'Law'];
        expect(reducer(undefined, {
            type: 'FETCH_CATEGORIES_FULFILLED',
            payload: categoryPayload
        })).toEqual({ ...DEFAULT_STATE, fetching: false, fetched: true, categories: categoryPayload });
    });

    it('can handle failing to fetch categories', () =>{
        const errorPayload = "500 Internal server error";
        expect(reducer(undefined, {
            type: 'FETCH_CATEGORIES_REJECTED',
            payload: errorPayload
        })).toEqual({ ...DEFAULT_STATE, fetching: false, error: errorPayload});
    });


});