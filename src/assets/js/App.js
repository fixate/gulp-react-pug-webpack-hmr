import React from 'react';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './store';
import reducers from './reducers';
import routes from './views/routes';
import Home from './views/home';
import Layout from './views/layout';
import About from './views/about';

const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path={routes.home} component={Layout}>
        <IndexRoute component={Home} />
        <Router path={routes.about} component={About} />
      </Route>
    </Router>
  </Provider>
);

App.displayName = 'App';

App.propTypes = { };

export default App;
