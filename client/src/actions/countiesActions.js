export function fetchCounties() {
    return function (dispatch) {
        return fetch('api/counties', {
            accept: 'application/json',
        }).then(parseJSON)
            .then((response) => {
                dispatch({ type: 'FETCH_COUNTIES_FULFILLED', payload: response.counties });
            })
            .catch((err) => {
                dispatch({ type: 'FETCH_COUNTIES_REJECTED', payload: err });
            });
    };
}

export function chooseCounty(county){
    return function(dispatch){
      dispatch({type: 'CHOOSE_COUNTY', payload: county});
    };
}

export function fetchChosenCounty(){
    return function(dispatch){
      dispatch({type: 'FETCH_CHOSEN_COUNTY'});
    };
}

function parseJSON(response) {
    return response.json();
}
