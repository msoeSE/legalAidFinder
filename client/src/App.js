import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import Home from './Home';
import Login from './Login';
import Header from './Header';

class App extends Component {
  state = {
    selectedFoods: [],
  };

  removeFoodItem = (itemIndex) => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addFood = (food) => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  };

  render() {
    const { selectedFoods } = this.state;

    return (
      <div className='App'>
        <Header />
        <div className='content'>
          <div className='content'>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
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
