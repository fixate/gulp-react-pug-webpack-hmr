import actionTypes from '../constants';

export function setValue(value) {
  return {
    type: actionTypes.HELLO.SET_VALUE,
    value,
  };
}

