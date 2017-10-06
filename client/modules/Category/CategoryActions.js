import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const DELETE_CATEGORIES = 'DELETE_CATEGORIES';

// Export Actions
export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
}

export function addCategoryRequest(category) {
  return (dispatch) => {
    return callApi('categories', 'category', {
      category: {
        name: category.name,
      },
    }).then(res => dispatch(addCategory(res.category)));
  };
}

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
  };
}

export function fetchCategories() {
  return (dispatch) => {
    return callApi('categories').then(res => {
      dispatch(addCategories(res.categories));
    });
  };
}

export function fetchCategory(categoryId) {
  return (dispatch) => {
    return callApi(`categories/${categoryId}`).then(res => dispatch(addCategory(res.category)));
  };
}

export function deleteCategory(categoryId) {
  return {
    type: DELETE_CATEGORIES,
    categoryId,
  };
}

export function deleteCategoryRequest(categoryId) {
  return (dispatch) => {
    return callApi(`categories/${categoryId}`, 'delete').then(() => dispatch(deleteCategory(categoryId)));
  };
}
