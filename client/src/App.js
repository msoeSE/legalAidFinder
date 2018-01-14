import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import AgencyAdd from './AgencyAdd';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <div className='content'>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/admin' component={AgencyAdd} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
