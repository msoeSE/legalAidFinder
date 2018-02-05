import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import { modifyCategories, fetchCategoriesAndFullDropdown } from '../../actions/categoriesActions';

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
      subcategories: [{ id: '', name: '', disabled: true }],
      msg: ''
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchCategoriesAndFullDropdown());
  }
  componentDidMount() {
    var category = this.props.category;
    let parent = '';
    if (category.parent)
      parent = category.parent.name;
    
    var array = [];
    category.subcategories.forEach((e) => {
      if (e !== null)
        array.push({ id: e._id, name: e.name, disabled: true });
    });

    this.setState({ 
      idVal: category._id,
      nameVal: category.name,
      parentVal: parent,
      subcategories: array
    });
  }
  categoryName(event) {
    this.setState({ nameVal: event.target.value, msg: '' });
  }
  /* For each subcategory, determine new parent (current category)
     and also remove from parent subcategory array to update reference */ 
  updateSubArray() {
    let full_subs = [];
    this.state.subcategories.forEach((e) => {
        let sub = this.props.data.categories.find((sub) => e.id === sub._id);
        if (sub && sub.parent) {
          sub.new_parent = this.props.category;
          if (sub.new_parent._id !== sub.parent._id) {
            let i = sub.parent.subcategories.indexOf(sub._id);
            sub.parent.subcategories.splice(i, 1);
          }
          full_subs.push(sub);
        }
    });
    return full_subs;
  }
  submitEditCategory(event) {
      event.preventDefault();
      
      const data = {
        query: { _id : this.state.idVal },
        name: this.state.nameVal,
        subcategories: this.updateSubArray(),
      };

      this.props.dispatch(modifyCategories(data)).then((response) => {
        if (!this.props.data.error) {
          this.props.dispatch(fetchCategoriesAndFullDropdown());
          let message = 'Successfully edited category: ' + this.state.nameVal;
          this.setState({ msg: message });
        } else {
          let message = 'Failed to edit category.';
          this.setState({ msg: message });
        }
      });
  }
  subcategoryChange = (idx) => (event, data) => {
    var category = this.props.data.categories.find((e) => {return e._id === data.value});
    let copy = this.state.subcategories.slice();
    let subs = copy.map((sub, i) => {
      return (i === idx) ? {...subs, id: category._id, name: category.name} : sub
    })
    this.setState({ subcategories: subs, msg: '' });
  }
  existingSubcategory(event) {
    event.preventDefault();
    this.setState({
      subcategories: this.state.subcategories.concat([{ id: '', name: '', disabled: false }]),
      msg: ''
    });
  }
  removeSubcategory = (idx) => (event) => {
    event.preventDefault();
    this.setState({
      subcategories: this.state.subcategories.filter((a, eidx) => idx !== eidx),
      msg: ''
    })
  }
  render() {
    return (
      <div align="center">
        <div>
          <form>
            <Input placeholder='Name' label='Name' labelPosition='left'
              size='big' fluid={true} className='padding'
              onChange={this.categoryName.bind(this)}
              value={this.state.nameVal}
            />
            <Input placeholder='Parent' label='Parent' labelPosition='left'
              size='big' fluid={true} className='padding' disabled
              value={this.state.parentVal}
            />
            <hr/>
            {this.state.subcategories.map((category, idx) => (
              <div key={idx}>
                <Dropdown placeholder='Category'  fluid={true} size='big' 
                  className='large text' search selection  options={this.props.data.dropdown} 
                  onChange={this.subcategoryChange(idx).bind(this)} // eslint-disable-next-line
                  placeholder={category.name} disabled={category.disabled}
                />
                <Button negative onClick={this.removeSubcategory(idx).bind(this)} className="padding" >Remove Subcategory</Button>
              </div>
            ))}
            <hr/>
            <Button color='blue' onClick={this.existingSubcategory.bind(this)} className='padding'>Add Subcategory</Button>
            <Button positive onClick={this.submitEditCategory.bind(this)}>Apply Changes</Button>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CategoryModify));