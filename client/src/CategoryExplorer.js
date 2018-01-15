import React, { Component } from 'react';
import Client from './Client';
import exampleImg from './images/money.png';

class CategoryExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
      categories: [],
    };
  }

  componentDidMount() {
    Client.getCategories()
      .then((d) => {
        this.setState({
          categories: d.categories,
        });
      }, () => {
        this.setState({
          requestFailed: true,
        });
      });
  }

  render() {
    if (!this.state.categories) {
      return (<div className='ui segment'>
        <p>Loading</p>
        <div className='ui active dimmer'>
          <div className='ui loader' />
        </div>
      </div>);
    }
    console.log(this.props.county);

    return (
      <div className='card-holder'>
        <h2>Select a category that corresponds with your legal issue:</h2>
        <div className='ui four column grid'>
          {
            this.state.categories.map(category =>
              category.parent === null ?
                <CategoryCard
                  key={category._id}
                  category={category}
                />
                  : null)
          }
        </div>
      </div>);
  }
}

class CategoryCard extends Component {

  render() {
    return (<div className='column'>
      <div className='ui red link card'>
        <div className='content'>
          <img className='right floated mini ui image' src={exampleImg} alt='category_img' />
          <div className='header'>{this.props.category.name}</div>
          <div className='meta'>
            <a>Sub-Categories</a>
          </div>
          <div className='description'> More categories!
            {/* { */}
            {/* this.props.category.subcategories.map(subCat => { */}
            {/* return <p>{subCat.name}</p>; */}
            {/* }) */}
            {/* } */}
          </div>
        </div>
        <div className='extra content'>
          <span className='right floated'>
            Click for more info
          </span>
          <span>
            {/* <i className='user icon' /> */}
            {/* 75 Friends */}
          </span>
        </div>
      </div>
    </div>);
  }
}

export default CategoryExplorer;
