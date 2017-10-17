import { ADD_CATEGORY, ADD_CATEGORIES, DELETE_CATEGORIES } from './CategoryActions';

// Initial State
const initialState = { data: [] };

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY :
      return {
        data: [action.category, ...state.data],
      };

    case ADD_CATEGORIES :
      return {
        data: action.categories,
      };

    case DELETE_CATEGORIES :
      return {
        data: state.data.filter(category => category._id !== action._id),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all categories
export const getCategories = state => state.categories.data;

// Get category by id
export const getCategory = (state, _id) => state.categories.data.filter(category => category._id === _id)[0];

// Export Reducer
export default CategoryReducer;
