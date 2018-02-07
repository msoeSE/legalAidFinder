import reducer from '../../src/Reducers/categoriesReducer';


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

    it('can add a category', () => {
        const newCategory = ['Health'];
        expect(reducer(undefined, {
            type: 'ADD_CATEGORY',
            payload: newCategory
        })).toEqual({ ...DEFAULT_STATE, categories: [...DEFAULT_STATE.categories, newCategory] });
    });

    it('can update a category', () => {
        const updatedCategory = {name: "Health", _id: 0};
        const categories = [{name: "Not Health", _id: 0}, {name: "Law", _id: 1}];
        const expectedCategories = [{name: "Health", _id: 0}, {name: "Law", _id: 1}];
        DEFAULT_STATE.categories = categories;

        expect(reducer(DEFAULT_STATE, {
            type: 'UPDATE_CATEGORY',
            payload: updatedCategory
        })).toEqual({ ...DEFAULT_STATE, categories: expectedCategories });
    });

    it('can delete a category', () => {
        const categoryToDelete = {name: "Health", _id: 0};
        const categories = [{name: "Health", _id: 0}, {name: "Law", _id: 1}];
        DEFAULT_STATE.categories = categories;

        expect(reducer(DEFAULT_STATE, {
            type: 'DELETE_CATEGORY',
            payload: categoryToDelete._id
        })).toEqual({ ...DEFAULT_STATE, categories: [{name: "Law", _id: 1}] });
    });


});