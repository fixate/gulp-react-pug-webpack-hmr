// if you find yourself needing redux bindings
// see https://github.com/supasate/connected-react-router

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import createStore from "./store";
import reducers from "./reducers";
import Layout from "./views/layout";

const history = createHistory();
const store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Layout />
    </BrowserRouter>
  </Provider>
);

App.displayName = "App";

App.propTypes = {};

export default App;
