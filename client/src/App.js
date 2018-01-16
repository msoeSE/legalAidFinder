import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import AdminPage from './Admin/AdminPage';
import CategoryDetail from './CategoryDetail';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/admin' component={AdminPage} />
            <Route path='/category/:id' component={CategoryDetail} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
