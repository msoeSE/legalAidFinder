/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import categories from './modules/Category/CategoryReducer';
import eligibilities from './modules/Eligibility/EligibilityReducer';
import agencies from './modules/Agency/AgencyReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  categories,
  eligibilities,
  agencies,
  intl,
});
