// if you find yourself needing redux bindings
// see https://github.com/supasate/connected-react-router

import { combineReducers } from "redux";

import helloReducer from "./hello";

export default combineReducers({
  helloStore: helloReducer
});
