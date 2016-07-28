import React, { PropTypes } from 'react';

const App = ({ children }) =>
  <div>{children}</div>;

App.displayName = 'App';

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
