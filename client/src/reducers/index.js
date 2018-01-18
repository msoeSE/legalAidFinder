import { combineReducers } from 'redux';

import categories from './categoriesReducer';
import counties from './countiesReducer';
//import user from './userReducer';

export default combineReducers({
  categories,
    counties,
  //user,
});
