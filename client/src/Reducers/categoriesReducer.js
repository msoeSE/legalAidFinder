export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_REJECTED = 'FETCH_CATEGORIES_REJECTED';
export const FETCH_CATEGORIES_FULFILLED = 'FETCH_CATEGORIES_FULFILLED';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';


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
    case FETCH_CATEGORIES_FULFILLED: {
      return { ...state, fetching: false, fetched: true, categories: action.payload };
    }
    case ADD_CATEGORY: {
      return { ...state, categories: [ ...state.categories, action.payload ] };
    }
    case UPDATE_CATEGORY: {
      const { id } = action.payload;
      const newCategories = [ ...state.categories ];
      const categoryToUpdate = newCategories.findIndex(category => category._id === id);
      newCategories[categoryToUpdate] = action.payload;

      return { ...state, categories: newCategories };
    }
    case DELETE_CATEGORY: {
      return { ...state, categories: state.categories.filter(category => category._id !== action.payload) };
    }
  }

  return state;
}
