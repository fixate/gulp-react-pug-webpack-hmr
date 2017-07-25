import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import createStore from './store';
import reducers from './reducers';
import Layout from './views/layout';

const history = createHistory();
const store = createStore(reducers);

const App = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>;

App.displayName = 'App';

App.propTypes = {};

export default App;
