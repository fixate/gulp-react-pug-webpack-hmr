import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import test from 'tape';
import { Home } from './index';
import sinon from 'sinon';

import '../../test/utils/setup-dom';
import React from 'react';

const mockStore = configureStore()({});
const helloActions = {
  setValue: () => {},
};

test('<Home /> contains hello world', assert => {
  const wrapper = shallow(<Home dispatch={mockStore.dispatch} helloStore={{}} />);
  const spy = sinon.spy(helloActions.setValue);

  wrapper.find('input').simulate('change', { target: { value: 'World' } });

  const actual = spy.called;
  const expected = true;

  assert.equal(actual, expected, 'returns hello world');

  assert.end();
});
