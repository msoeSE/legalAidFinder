import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button, Dropdown } from 'semantic-ui-react';
import { addCategories, fetchCategoriesAndFullDropdown } from '../../actions/categoriesActions';

function mapStateToProps(state) {
  return { data: state.categories };
}

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      parent: ''
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchCategoriesAndFullDropdown());
  }
  categoryName(event) {
    this.setState({ name: event.target.value });
  }
  parentChange(event, data) {
    var category = this.props.data.categories.find((e) => {return e._id === data.value});
    this.setState({ parent: category, msg: '' });
  }
  submitCategory(event) {
      event.preventDefault();
      const data = {
        name: this.state.name,
        parent: this.state.parent
      };

      this.props.dispatch(addCategories(data)).then(() => {
        if (!this.props.data.error) {
          let message = 'Successfully created category: ' + this.state.name;
          this.setState({ msg: message, name: ''});
        } else {
          let message = this.state.name !== '' ? 'Failed to create category: ' + this.state.name : 'Failed to create category.';
          this.setState({ msg: message });
        }
      });;
  }
  render() {
    return (
      <div>
        <div align="center">
          <form>
            <Input placeholder='Name' label='Name ' labelPosition='left'
              size='big' fluid={true} className='padding'
              onChange={this.categoryName.bind(this)} value={this.state.name}
            />
            <Dropdown placeholder='Category'  fluid={true} size='big' 
              className='large text' search selection  options={this.props.data.dropdown} 
              onChange={this.parentChange.bind(this)} // eslint-disable-next-line
              placeholder="Select a parent category"
            />
            <Button positive onClick={this.submitCategory.bind(this)}>Add Category</Button>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CategoryAdd));
