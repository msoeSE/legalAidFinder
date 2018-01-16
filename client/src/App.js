import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import AdminPage from './Admin/AdminPage';
import CategoryTree from './Admin/Category/CategoryTree';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <div className='content'>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/admin' component={AdminPage} />
            <Route path='/category' component={CategoryTree} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
