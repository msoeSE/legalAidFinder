// Import Actions
import { TOGGLE_ADD_CATEGORIES } from './AppActions';

// Initial State
const initialState = {
  showAddCategories: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_CATEGORIES:
      return {
        showAddCategories: !state.showAddCategories,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddCategory
export const getShowAddCategories = state => state.app.showAddCategories;

// Export Reducer
export default AppReducer;
