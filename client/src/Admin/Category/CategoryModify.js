import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import {
  modifyCategories, fetchCategoriesAndFullDropdown, addCategories,
  fetchCategories
} from '../../Actions/categoriesActions';
import mongoose from 'mongoose';

function mapStateToProps(state) {
  return { data: state.categories };
}

class CategoryModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idVal: '',
      nameVal: '',
      parentVal: '',
      subcategories: [],
      deletedSubcategories: [],
      msg: '',
    };

    this.submitEditCategory = this.submitEditCategory.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  componentDidMount() {
    const category = this.props.category;
    let parent = '';
    if (category.parent) { parent = category.parent.name; }

    const array = [];
    category.subcategories.forEach((e) => {
      if (e !== null) { array.push({ _id: e._id, name: e.name, disabled: true, parent: category }); }
    });

    this.setState({
      idVal: category._id,
      nameVal: category.name,
      parentVal: parent,
      subcategories: array,
    });
  }

  categoryName(event) {
    this.setState({ nameVal: event.target.value, msg: '' });
  }

  submitEditCategory() {
    const data = {
      query: { _id: this.state.idVal },
      name: this.state.nameVal,
      subcategories: this.state.subcategories,
      deletedSubcategories: this.state.deletedSubcategories,
    };

    this.props.dispatch(modifyCategories(data)).then(() => {
      if (!this.props.data.error) {
        this.props.dispatch(fetchCategories());
        const message = `Successfully edited category: ${this.state.nameVal}`;
        this.setState({ msg: message });
      } else {
        const message = 'Failed to edit category.';
        this.setState({ msg: message });
      }
    });
  }

  createNewSubcategories(event) {
    event.preventDefault();
    this.state.subcategories.map((sub) => {
      if (sub.disabled === false) {
        const newId = mongoose.Types.ObjectId();

        sub._id = newId.toString();
        const data = {
          name: sub.name,
          _id: newId,
          parent: this.props.category,
        };

        this.props.dispatch(addCategories(data)).then(() => {
          const message = `Successfully created category: ${sub.name}`;
          this.setState({ msg: message, name: '' });
        });
      }
    });

    this.submitEditCategory();
  }

  subcategoryChange = idx => (event, data) => {
    this.state.subcategories[idx].name = data.value;
  };

  existingSubcategory(event) {
    event.preventDefault();
    this.setState({
      subcategories: this.state.subcategories.concat([ { _id: '', name: '', disabled: false } ]),
      msg: '',
    });
  }

  removeSubcategory = idx => (event) => {
    event.preventDefault();

    this.state.deletedSubcategories.push(this.state.subcategories[idx]);
    this.setState({
      subcategories: this.state.subcategories.filter((a, eidx) => idx !== eidx),
      msg: '',
    });
  };

  render() {
    return (
      <div align='center'>
        <div>
          <form>
            <Input
              placeholder='Name' label='Name' labelPosition='left'
              size='big' fluid className='padding'
              onChange={this.categoryName.bind(this)}
              value={this.state.nameVal}
            />
            <Input
              placeholder='Parent' label='Parent' labelPosition='left'
              size='big' fluid className='padding' disabled
              value={this.state.parentVal}
            />
            <hr />
            {this.state.subcategories.map((category, idx) => (
              <div key={idx} style={{ margin: '5px' }}>
                {category.disabled ?
                  <Input
                    size='big' readOnly fluid style={{ marginLeft: '2px' }} placeholder='Enter new category..' defaultValue={category.name}
                    action={<Button negative onClick={this.removeSubcategory(idx).bind(this)}>Remove Subcategory</Button>}
                  />
                  :
                  <Input
                    size='big' icon='plus green' iconPosition='left' placeholder='Enter new category..' fluid style={{ marginLeft: '2px' }}
                    onChange={this.subcategoryChange(idx).bind(this)} defaultValue={category.name}
                    action={<Button negative onClick={this.removeSubcategory(idx).bind(this)}>Remove Subcategory</Button>}
                  />
                }
                {/* <Button size='mini' negative onClick={this.removeSubcategory(idx).bind(this)} className='padding' style={{ margin: '3px' }}>Remove Subcategory</Button> */}
              </div>
            ))}
            <Button color='blue' onClick={this.existingSubcategory.bind(this)}>Add Subcategory</Button>
            <hr />
            <Button positive onClick={this.createNewSubcategories.bind(this)}>Submit Changes</Button>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CategoryModify));
