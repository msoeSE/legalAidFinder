import React, { Component } from 'react';
import CategoryExplorer from './CategoryExplorer';
import CountySelector from "./County/CountySelector";
import PropTypes from "prop-types";

class Home extends Component {
  render() {
    return (
      <div>
        <CategoryExplorer county={this.props.county} />
      </div>
    );
  }
}

CountySelector.propTypes = {
    county: PropTypes.string
};

export default Home;
