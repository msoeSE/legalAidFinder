import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import CategoryExplorer from './CategoryExplorer';
import CategoryDetail from './CategoryDetail';


class Home extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={CategoryExplorer} />
        <Route path='category/:id' component={CategoryDetail} />
      </div>
    );
  }
}

export default Home;
