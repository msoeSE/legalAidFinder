import { combineReducers } from 'redux';

import categories from './categoriesReducer';
import counties from './countiesReducer';
import eligibility from './eligibilityReducer';
//import user from './userReducer';

export default combineReducers({
  categories,
  counties,
  eligibility,
  //user,
});
