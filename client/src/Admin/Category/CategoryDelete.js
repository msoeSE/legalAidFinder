import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Button, Loader } from 'semantic-ui-react';
import MagnifyLoader from '../../Helpers/MagnifyLoader';
import { fetchCategoriesAndFullDropdown, deleteCategories } from '../../Actions/categoriesActions';
import AdminDeleteModal from "../AdminDeleteModal";

function mapStateToProps(state) {
  return { data: state.categories };
}

class CategoryDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            msg: '',
            modalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.submitCategory = this.submitCategory.bind(this);
    }
  componentWillMount() {
    this.props.dispatch(fetchCategoriesAndFullDropdown());
  }
  categoryID(event, data) {
    this.setState({ id: data.value, msg: '' });
  }

    toggleModal(event) {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
        event.preventDefault();
    }

  submitCategory() {
      const data = {
        id: this.state.id
      };

      this.props.dispatch(deleteCategories(data)).then(() => {
        this.props.dispatch(fetchCategoriesAndFullDropdown());
        this.setState({ msg: 'Successfully deleted category.', modalOpen: false });

      });
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
                onClick={this.toggleModal}>Delete Category</Button>
            </div>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
          <div>
              <AdminDeleteModal
                  showModal={this.state.modalOpen}
                  onClose={this.toggleModal}
                  deleteMessage="Are you sure you want to delete this category?"
                  onSubmit={this.submitCategory}
                  category={this.state.id}
              />
          </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CategoryDelete));
