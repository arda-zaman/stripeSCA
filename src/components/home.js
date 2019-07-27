import React from 'react';
import PropTypes from 'prop-types';
import Products from './products';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="home-page">
        <div className="home-page-content">
          <div className="products">
            <Products />
          </div>
        </div>
      </div>
    )
  }
};


export default connect()(Home);