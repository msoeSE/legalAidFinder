import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import CountySelect from "./County/CountySelect";

class App extends Component {

    constructor() {
        super();
        console.log("app constructor");
        this.state = {
            chosenCounty: ""
        };
        this.county = "";
        this.chooseCounty = this.chooseCounty.bind(this);
    }

    chooseCounty = (county) => {
        console.log("App: " + county);
        this.setState({ chosenCounty: county });
        this.county = county;
    };

  render() {

    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <div className='content'>
            <Route exact path='/' render={() => <Home county={this.county}/>} />
            <Route path='/login' component={Login} />
            <Route path='/counties' render={() => <CountySelect callback={this.chooseCounty}/>} />
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
