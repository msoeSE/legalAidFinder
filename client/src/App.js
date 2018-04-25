import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './Home/Home';
import Header from './Header';
import Footer from './Footer';
import AdminPage from './Admin/AdminPage';
import CountySelect from './County/CountySelect';
import CategoryDetail from './Categories/CategoryDetail';
import AgencyHome from './AgencyHome/AgencyHome';
import CategoryHome from './Home/CategoryHome';
import AgencyRequestForm from './AgencyRequest/AgencyRequestForm';

const NoMatch = () => (
  <Redirect to='/' />
);

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/workflow' component={CategoryHome} />
            <Route path='/agency' component={AgencyHome} />
            <Route path='/admin' component={AdminPage} />
            <Route path='/category/:id' component={CategoryDetail} />
            <Route path='/counties' component={CountySelect} />
            <Route path='/agencyrequestform' component={AgencyRequestForm} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}

export default App;
