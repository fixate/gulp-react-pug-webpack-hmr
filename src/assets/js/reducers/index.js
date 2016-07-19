import { combineReducers } from 'redux';
import helloReducer from './hello';

export default combineReducers({
  helloStore: helloReducer,
});
