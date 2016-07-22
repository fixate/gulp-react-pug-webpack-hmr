import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import test from 'tape';
import { App } from './App';
import sinon from 'sinon';

const mockStore = configureStore()({});
const helloActions = {
  setValue: () => {},
};

test('<App /> contains hello world', assert => {
  const wrapper = shallow(<App dispatch={mockStore.dispatch} helloStore={{}} />);
  const spy = sinon.spy(helloActions.setValue);

  wrapper.find('input').simulate('change', { target: { value: 'World' }});
  debugger;

  const actual = spy.called;
  const expected = true;

  assert.equal(actual, expected, 'returns hello world');

  assert.end();
});
