import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './store';
import reducers from './reducers';

import App from './components/App';

const store = createStore(reducers);

render(<Provider store={store}><App /></Provider>, document.querySelector('.js-mount-point'));
