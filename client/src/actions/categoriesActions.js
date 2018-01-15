export default function fetchCategories() {
  return function (dispatch) {
    return fetch('api/categories', {
      accept: 'application/json',
    }).then(parseJSON)
      .then((response) => {
        dispatch({ type: 'FETCH_CATEGORIES_FULFILLED', payload: response.categories });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_CATEGORIES_REJECTED', payload: err });
      });
  };
}

function parseJSON(response) {
  return response.json();
}
