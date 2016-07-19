import actionTypes from '../constants';

function setValue(value) {
  return {
    type: actionTypes.HELLO.SET_VALUE,
    value,
  };
}

export {
  setValue,
};
