import React from 'react';
import {Route, Switch} from 'react-router-dom';

import routes from '../routes';
import Home from '../home';
import About from '../about';

const Layout = () =>
  <div>
    <Switch>
      <Route exact path={routes.home} component={Home} />
      <Route path={routes.about} component={About} />
    </Switch>
  </div>;

Layout.displayName = 'Layout';

export default Layout;
