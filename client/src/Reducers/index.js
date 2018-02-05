import { combineReducers } from 'redux';

import agencies from './agenciesReducer';
import categories from './categoriesReducer';
import counties from './countiesReducer';
import user from './userReducer';

export default combineReducers({
  agencies,
  categories,
  counties,
  user,
});
