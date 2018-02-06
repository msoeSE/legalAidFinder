export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_REJECTED = 'FETCH_CATEGORIES_REJECTED';
export const FETCH_CATEGORIES_FULFILLED = 'FETCH_CATEGORIES_FULFILLED';
export const FETCH_CATEGORIES_DROPDOWN_FULFILLED = 'FETCH_CATEGORIES_DROPDOWN_FULFILLED';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const REQUEST_REJECTED = 'REQUEST_REJECTED';
export const FETCH_CATEGORIES_FULL_DROPDOWN_FULFILLED = 'FETCH_CATEGORIES_FULL_DROPDOWN_FULFILLED';


export default function reducer(state = {
  categories: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES: {
      return { ...state, fetching: true };
    }
    case FETCH_CATEGORIES_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case REQUEST_REJECTED: {
      return { ...state, error: action.payload };
    }
    case FETCH_CATEGORIES_FULFILLED: {
      return { ...state, fetching: false, fetched: true, categories: action.payload };
    }
    case FETCH_CATEGORIES_DROPDOWN_FULFILLED: {
      const categories_temp = action.payload;
      const dropdown_temp = categories_temp.filter(p => !p.parent).map(c => ({ key: c._id, value: c._id, text: c.name }));
      return { ...state, categories: categories_temp, dropdown: dropdown_temp, error: null };
    }
    case FETCH_CATEGORIES_FULL_DROPDOWN_FULFILLED: {
      const categories_temp = action.payload;
      const dropdown_temp = categories_temp.map(c => ({ key: c._id, value: c._id, text: c.name }));
      return { ...state, categories: categories_temp, dropdown: dropdown_temp, error: null };
    }
    case ADD_CATEGORY: {
      return { ...state, categories: [ ...state.categories, action.payload ], error: null };
    }
    case UPDATE_CATEGORY: {
      const id = action.payload.query._id;
      const newCategories = [ ...state.categories ];
      const categoryToUpdate = newCategories.findIndex(category => category._id === id);
      newCategories[categoryToUpdate].name = action.payload.name;

      return { ...state, categories: newCategories };
    }
    case DELETE_CATEGORY: {
      return { ...state, categories: state.categories.filter(category => category._id !== action.payload) };
    }
  }

  return state;
}
