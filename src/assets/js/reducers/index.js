import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import helloReducer from './hello';

export default combineReducers({
  helloStore: helloReducer,
  routing: routerReducer,
});
