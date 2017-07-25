import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import routes from '../routes';
import * as helloActions from '../../actions/hello';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {setValue} = this.props;

    setValue(e.target.value);
  }

  render() {
    const {value} = this.props.helloStore;

    return (
      <div>
        <div>
          <Link to={routes.about}>about</Link>
        </div>

        <h1>
          Hello {value}
        </h1>
        <input type="text" value={value} onChange={this.handleChange} />
      </div>
    );
  }
}

Home.propTypes = {
  setValue: PropTypes.func.isRequired,
  helloStore: PropTypes.object.isRequired,
};

function mapStateToProps({helloStore}) {
  return {helloStore};
}

export default connect(mapStateToProps, helloActions)(Home);
