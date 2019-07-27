import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initLocalProducts } from '../actions/productActions';

require('./utils/polyfill');

class App extends React.Component {
  state = {
    isLoad: false
  }

  componentWillMount() {
    const { onInitLocalProducts } = this.props;

    if (onInitLocalProducts) {
      onInitLocalProducts().then(res => {
        this.setState({
          isLoad: true
        })
      });
    }
  }

  render() {
    const { children, user } = this.props;
    const { isLoad } = this.state;

    if (isLoad) {
      return <div className="app">{children}</div>;
    }

    return <div>Loading</div>;
  }
}

App.propTypes = {
  children: PropTypes.array.isRequired,
};

const mapStateToProps = ({ }) => {
  return {
  };
};

const mapDispatchToProps = {
  onInitLocalProducts: initLocalProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
