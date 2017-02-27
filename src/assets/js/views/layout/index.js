import React, { PropTypes } from 'react';

const Layout = ({ children }) => (
  <div>{children}</div>
);

Layout.displayName = 'Layout';
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
