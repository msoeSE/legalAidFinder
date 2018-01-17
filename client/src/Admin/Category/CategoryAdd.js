import React, { Component } from 'react';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import Client from '../../Client';

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      categories: '',
      subcategories: [{ id: '' }]
    };
    this.handleAgencyName = this.handleAgencyName.bind(this);
    this.handleCategoryID = this.handleCategoryID.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.handleRemoveEmail = this.handleRemoveEmail.bind(this);
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
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
  handleAgencyName(event) {
    this.setState({ name: event.target.value });
  }
  handleCategoryID(event, data) {
    this.setState({ id: data.value });
  }
  handleSubmitAgency(event) {
      event.preventDefault();
      const data = {
        name: this.state.name,
        url: this.state.url,
        subcategories: this.state.subcategories
      };
      console.log(data);

      Client.postAgencies(data)
        .then((d) => {
          console.log(d);
        });
  }
  handleEmailAddressChange = (idx) => (event, data) => {
    console.log(data.value)
    let copy = this.state.subcategories.slice();
    let subcategories = copy.map((subcategory, i) => {
      return (i === idx) ? {...subcategory, id: data.value} : subcategory
    })
    this.setState({ subcategories: subcategories });
  }
  handleAddEmail(event) {
    event.preventDefault();
    this.setState({
      subcategories: this.state.subcategories.concat([{ id: '' }])
    });
  }
  handleRemoveEmail = (idx) => (event) => {
    event.preventDefault();
    this.setState({
      subcategories: this.state.subcategories.filter((a, eidx) => idx !== eidx)
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
            <Input placeholder='Name'
              label='Name '
              labelPosition='left'
              size='big'
              fluid={true}
              className='padding'
              onChange={this.handleAgencyName}
              value={this.state.name}
            />
            {this.state.subcategories.map((category, idx) => (
              <div key={Math.random(99999999)*(new Date().getMilliseconds())}>
                <Input
                  label='Child'
                  labelPosition='left'
                  size='big'
                  type="text"
                  placeholder={`Subcategory #${idx + 1}`}
                  value={category.name}
                  className='padding'
                  onChange={this.handleEmailAddressChange(idx)}
                />
                <Button negative onClick={this.handleRemoveEmail(idx)} className="padding" >-</Button>
              </div>
            ))}
            <Button color='blue' onClick={this.handleAddEmail} className='padding'>Add Subcategory</Button>
            <Button positive onClick={this.handleSubmitAgency}>Add Category</Button>
          </form>
          {/*<Dropdown placeholder='Category' 
              fluid={true} size='big' 
              className='padding2' 
              search 
              selection 
              options={this.state.categories} 
              onChange={this.handleCategoryID} 
            />
            <Input placeholder='ID'
              disabled
              size='big'
              fluid={true}
              className='padding'
              value={this.state.id}
          />*/}
        </div>
      </div>
    );
  }
}

export default CategoryAdd;