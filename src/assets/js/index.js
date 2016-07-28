import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './store';
import reducers from './reducers';

import routes from './views/routes';
import App from './views/App';
import Home from './views/home';
import About from './views/about';

const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={routes.home} component={App}>
        <IndexRoute component={Home} />
        <Router path={routes.about} component={About} />
      </Route>
    </Router>
  </Provider>,

  document.querySelector('.js-mount-point')
);

