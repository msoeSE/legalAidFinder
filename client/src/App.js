import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import CountySelect from "./County/CountySelect";

class App extends Component {
  state = {

  };

  render() {

    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <div className='content'>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/counties' component={CountySelect} />
          </div>
        </div>
        {/*<div className='ui text container'>*/}
          {/*<SelectedFoods*/}
            {/*foods={selectedFoods}*/}
            {/*onFoodClick={this.removeFoodItem}*/}
          {/*/>*/}
          {/*<FoodSearch onFoodClick={this.addFood} />*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default App;
