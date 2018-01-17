import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import Client from '../../Client';

class CategoryDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      categories: ''
    };
    this.handleCategoryID = this.handleCategoryID.bind(this);
    this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
  }
  componentDidMount() {
    Client.getCategories()
      .then((d) => {
        this.setState({
          categories: d.categories.map((c) => {return {key: c._id, value: c._id, text: c.name}}),
        });
      }, () => {
        this.setState({
          requestFailed: true,
        });
      });
  }
  handleCategoryID(event, data) {
    this.setState({ id: data.value });
  }
  handleSubmitCategory(event) {
      event.preventDefault();
      const data = {
        id: this.state.id,
      };
      Client.deleteCategories(data)
        .then((d) => {
          console.log(d);
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
    return (
      <div>
        <div>
          <form>
            <Dropdown placeholder='Category' 
              fluid={true} size='big' 
              className='padding2' 
              search 
              selection 
              options={this.state.categories} 
              onChange={this.handleCategoryID} 
            />
            <div className='padding2'>
              <Button negative onClick={this.handleSubmitCategory} className='padding2'>Delete Category</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CategoryDelete;