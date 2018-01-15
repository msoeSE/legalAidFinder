import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
        </div>
      </div>
    );
  }
}

export default App;
