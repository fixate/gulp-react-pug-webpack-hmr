import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import routes from '../routes';
import * as helloActions from '../../actions/hello';

export const Home = React.createClass({
  displayName: 'Home',

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    helloStore: PropTypes.object.isRequired,
  },

  handleChange(e) {
    const { dispatch } = this.props;

    dispatch(helloActions.setValue(e.target.value));
  },

  render() {
    const { value } = this.props.helloStore;

    return (
      <div>
        <div>
          <Link to={routes.about}>about</Link>
        </div>

        <h1>Hello {value}</h1>
        <input type="text" value={value} onChange={this.handleChange} />
      </div>
    );
  },
});

function mapStateToProps({ helloStore }) {
  return { helloStore };
}

export default connect(mapStateToProps)(Home);
