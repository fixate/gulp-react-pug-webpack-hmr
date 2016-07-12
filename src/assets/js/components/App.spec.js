import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import App from './App';

test('<App /> contains hello world', assert => {
  const wrapper = shallow(<App />);

  const actual = wrapper.text();
  const expected = 'Hello World';

  assert.equal(actual, expected, 'returns hello world');

  assert.end();
});
