import reducer from '../../src/Reducers/countiesReducer';


const DEFAULT_STATE = {
    counties: [],
    chosenCounty: "",
    fetching: false,
    fetched: false,
    error: null,
};

describe('Counties Reducer', () =>{

    it('has a default state', () => {

        expect(reducer(undefined, {
            type: 'unexpected'
        })).toEqual(DEFAULT_STATE); // Passing in undefined defaults to the
                                    // reducer's default state

    });

    it('can begin fetching counties', () => {
        expect(reducer(undefined, {
            type: 'FETCH_COUNTIES',
            payload: {}
        })).toEqual({ ...DEFAULT_STATE, fetching: true});
    });

    it('can succeed fetching counties', () =>{
        const countyPayload = ['Adams', 'Milwaukee'];
        expect(reducer(undefined, {
            type: 'FETCH_COUNTIES_FULFILLED',
            payload: countyPayload
        })).toEqual({ ...DEFAULT_STATE, fetched: true, counties: countyPayload});
    });

    it('can handle failing to fetch counties', () =>{
        const errorPayload = "500 Internal server error";
        expect(reducer(undefined, {
            type: 'FETCH_COUNTIES_REJECTED',
            payload: errorPayload
        })).toEqual({ ...DEFAULT_STATE, fetching: false, error: errorPayload});
    });

    it('can choose a county and save to the state', () => {
        const chosenCounty = "Milwaukee";
        expect(reducer(undefined, {
            type: 'CHOOSE_COUNTY',
            payload: chosenCounty
        })).toEqual({ ...DEFAULT_STATE, chosenCounty: chosenCounty});
    });

});