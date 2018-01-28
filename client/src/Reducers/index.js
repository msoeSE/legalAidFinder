import { combineReducers } from 'redux';

import agencies from './agenciesReducer';
import categories from './categoriesReducer';
import counties from './countiesReducer';

export default combineReducers({
  agencies,
  categories,
  counties,
});
