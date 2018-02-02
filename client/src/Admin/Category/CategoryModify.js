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
      subcategories: [{ id: '', name: '' }],
      msg: ''
    };
    this.populateInputs();
    this.handleAgencyName = this.handleAgencyName.bind(this);
    this.handleAgencyURL = this.handleAgencyURL.bind(this);
    //this.handleCategoryID = this.handleCategoryID.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.handleRemoveEmail = this.handleRemoveEmail.bind(this);
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
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
        array.push({ id: e._id, name: e.name });
    });
    this.setState({ 
      idVal: category._id,
      nameVal: category.name,
      parentVal: parent,
      subcategories: array
    });
  }
  populateInputs() {
    
  }
  // handleCategoryID(event, data) {
  //   this.setState({ id: data.value });
  //   var category = this.props.data.categories.find((e) => {return e._id === data.value});
  //   this.setState({ nameVal: category.name, idVal: category._id });
  //   if (category.parent)
  //     this.setState({ parentVal: category.parent.name });
  //   var array = [];
  //   category.subcategories.forEach((e) => {
  //     if (e !== null)
  //       array.push({ id: e._id, name: e.name });
  //   });
  //   this.setState({ subcategories: array });
  // }
  handleAgencyName(event) {
    this.setState({ name: event.target.value });
  }
  handleAgencyURL(event) {
    this.setState({ url: event.target.value });
  }
  handleSubmitAgency(event) {
      event.preventDefault();
      const data = {
        name: this.state.name,
        url: this.state.url,
        subcategories: this.state.subcategories
      };
      console.log(data);

      this.props.dispatch(modifyCategories(data)).then(() => {
        if (!this.props.data.error) {
          // Display success
          this.props.dispatch(fetchCategoriesAndFullDropdown());
          let message = 'Successfully edited category: ' + this.state.nameVal;
          this.setState({ msg: message });
        } else {
          // Display error
          let message = 'Failed to edit category.';
          this.setState({ msg: message });
        }
      });

      // Client.postAgencies(data)
      //   .then((d) => {
      //     console.log(d);
      //   });
  }
  handleEmailAddressChange = (idx) => (event) => {
    let copy = this.state.subcategories.slice();
    let subcategories = copy.map((subcategory, i) => {
      return (i === idx) ? {...subcategory, id: event.target.value} : subcategory
    })
    this.setState({ subcategories: subcategories });
  }
  handleAddEmail(event) {
    event.preventDefault();
    this.setState({
      subcategories: this.state.subcategories.concat([{ id: '', name: '' }])
    });
  }
  handleRemoveEmail = (idx) => (event) => {
    event.preventDefault();
    this.setState({
      subcategories: this.state.subcategories.filter((a, eidx) => idx !== eidx)
    });
  }
  render() {
    return (
      <div>
        <div>
          <form>
            {/* <Dropdown placeholder='Category' 
              fluid={true} size='big' 
              className='padding2' 
              search 
              selection 
              options={this.props.data.dropdown} 
              onChange={this.handleCategoryID} 
            /> */}
            <Input placeholder='Name'
              label='Name'
              labelPosition='left'
              size='big'
              fluid={true}
              className='padding'
              onChange={this.handleAgencyName}
              value={this.state.nameVal}
            />
            <Input placeholder='Parent'
              label='Parent'
              labelPosition='left'
              size='big'
              fluid={true}
              className='padding'
              onChange={this.handleAgencyName}
              value={this.state.parentVal}
            />
            {this.state.subcategories.map((category, idx) => (
              <div key={idx}>
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
            <Button positive onClick={this.handleSubmitAgency}>Edit Category</Button>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CategoryModify));