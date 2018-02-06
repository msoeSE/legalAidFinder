import { combineReducers } from 'redux';

import agencies from './agenciesReducer';
import categories from './categoriesReducer';
import counties from './countiesReducer';
import eligibility from './eligibilityReducer';
import user from './userReducer';
import admins from './adminsReducer';

export default combineReducers({
  agencies,
  categories,
  counties,
  eligibility,
  user,
  admins,
});
