import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Button, Loader } from 'semantic-ui-react';
import MagnifyLoader from '../../Helpers/MagnifyLoader';
import { fetchCategoriesAndFullDropdown, deleteCategories } from '../../Actions/categoriesActions';

function mapStateToProps(state) {
  return { data: state.categories };
}

class CategoryDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      msg: ''
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchCategoriesAndFullDropdown());
  }
  categoryID(event, data) {
    this.setState({ id: data.value, msg: '' });
  }
  submitCategory(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to delete it?')) {
      const data = {
        id: this.state.id
      };

      this.props.dispatch(deleteCategories(data)).then(() => {
        if (!this.props.data.error) {
          this.props.dispatch(fetchCategoriesAndFullDropdown());
          this.setState({ msg: 'Successfuly deleted category.' });
        } else {
          this.setState({ msg: 'Failed to delete category.' });
        }
      });
    } else {
      this.setState({ msg: '' });
    }
  }
  render() {
    if (!this.props.data.dropdown) {
      return (<MagnifyLoader label="Loading categories..." />);
    }

    return (
      <div>
        <div align="center">
          <form>
            <Dropdown placeholder='Select a Category to delete'
              fluid={true} size='big' className='padding2' search selection
              options={this.props.data.dropdown} onChange={this.categoryID.bind(this)}
            />
            <div className='padding2'>
              <Button negative type='Submit' value='Submit' className='padding2'
                onClick={this.submitCategory.bind(this)}>Delete Category</Button>
            </div>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CategoryDelete));
