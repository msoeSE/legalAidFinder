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
        parent: category.parent,
        subcategories: category.subcategories,
        _id: category._id,
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

export function fetchCategory(_id) {
  return (dispatch) => {
    return callApi(`categories/${_id}`).then(res => dispatch(addCategory(res.category)));
  };
}

export function deleteCategory(_id) {
  return {
    type: DELETE_CATEGORIES,
    _id,
  };
}

export function deleteCategoryRequest(_id) {
  return (dispatch) => {
    return callApi(`categories/${_id}`, 'delete').then(() => dispatch(deleteCategory(_id)));
  };
}
