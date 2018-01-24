import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import AdminPage from './Admin/AdminPage';
import CountySelect from './County/CountySelect';
import CategoryDetail from './CategoryDetail';
import AgencyHome from "./AgencyHome/AgencyHome";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/agency' component={AgencyHome}/>
            <Route path='/admin' component={AdminPage} />
            <Route path='/category/:id' component={CategoryDetail} />
            <Route path='/counties' component={CountySelect} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
