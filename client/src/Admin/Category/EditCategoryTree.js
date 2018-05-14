import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Divider, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteCategories, fetchCategories } from '../../Actions/categoriesActions';
import MagnifyLoader from '../../Helpers/MagnifyLoader';
import CategoryModal from './CategoryModal';
import getBulletPoint from '../../Helpers/Bulletpoints';
import AdminDeleteModal from "../AdminDeleteModal";


function mapStateToProps(state) {
  return { data: state.categories, info: state.eligibility };
}

class EditCategoryTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      items: [],
      depth: 0,
      innerDepth: 0,
      created: false,
      currentCategory: '',
        deleteModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

    toggleDeleteModal(event, data) {
    if(data.id) {
        const category = this.findCategory(data.id);
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen,
            currentCategory: category
        });
    } else {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }
        event.preventDefault();

    }

    deleteCategory() {
        //const parent = this.findCategory(data.id).parent;

        const category = this.state.currentCategory;
        category.id = this.state.currentCategory._id;

        this.setState({
            deleteModalOpen: false
        });

        this.props.dispatch(deleteCategories(category)).then(() => {
            this.props.dispatch(fetchCategories());
        });
  }

  // Recursive function that generates the checkboxes
  traverse(category) {
    if (this.state.items.some(e => e._id === category._id)) {
      return;
    }

    if (category.parent === null) {
      this.state.items.push(this.createCategorySection(category, this.state.depth, true));
    } else {
      this.state.items.push(this.createCategorySection(category, this.state.depth));
    }

    // Iterate though all keys in the category object
    for (const key in category) {
      if (!category.hasOwnProperty(key)) { continue; }
      // Recursive call if category has subcategories
      if (key === 'subcategories') {
        if (category[key] !== null && typeof (category[key]) === 'object') {
          // going one step down in the object tree!!
          ++this.state.depth;
          category[key].forEach((element) => {
            if (typeof (element) === 'string') {
              this.traverse(this.findCategory(element));
            } else {
              this.traverse(this.findCategory(element._id));
            }
          });
          --this.state.depth;
        }
      }
    }
  }

  makeTree(categoryId = 0) {
    let filteredCategories = this.props.data.categories.filter(category => category.parent === null);
    if (categoryId !== 0) {
      filteredCategories = this.props.data.categories.filter(category => category._id === categoryId);
    }

    filteredCategories.map((category) => { // eslint-disable-line array-callback-return
      this.state.depth = 0;
      this.traverse(category);
    });
  }

  // Find the appropriate category based off of the category ID
  findCategory(categoryID) {
    const elementPos = this.props.data.categories.map(x => x._id).indexOf(categoryID);
    return this.props.data.categories[elementPos];
  }

  openModal(event, data) {
    const category = this.findCategory(data.id);
    this.setState({
      modalOpen: !this.state.modalOpen,
      currentCategory: category,
    });
  }

  closeModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  createCategorySection(category, depth, isTopParent = false) {
    let buttonGroup;
    if (category.subcategories && category.subcategories.length > 0) {
      buttonGroup = (
        <Button.Group size='mini' style={{ marginLeft: '5px' }}>
          <Button animated='vertical' inverted onClick={this.openModal} color='green' id={category._id}>
            <Button.Content hidden>Edit</Button.Content>
            <Button.Content visible>
              <Icon name='plus' />
            </Button.Content>
          </Button>
        </Button.Group>
      );
    } else {
      buttonGroup = (
        <Button.Group size='mini' style={{ marginLeft: '5px' }}>
          <Button animated='vertical' inverted onClick={this.openModal} color='green' id={category._id}>
            <Button.Content hidden>Edit</Button.Content>
            <Button.Content visible>
              <Icon name='plus' />
            </Button.Content>
          </Button>
          <Button animated='vertical' inverted onClick={this.toggleDeleteModal} color='red' id={category._id}>
            <Button.Content hidden>Delete</Button.Content>
            <Button.Content visible>
              <Icon name='minus' />
            </Button.Content>
          </Button>
        </Button.Group>
      );
    }

    if (isTopParent) {
      return (
        <div key={category._id} style={{ marginLeft: `${50 * depth}px`, marginTop: '10px' }}>
          <h2 className='underline'>{category.name}
            {buttonGroup}
          </h2>
        </div>
      );
    } else {
      let bold = 'normal';
      if (depth === 1) {
        bold = 'bold';
      }

      return (
        <div key={category._id} style={{ marginLeft: `${50 * depth}px`, marginTop: '5px', fontWeight: bold }}>
          {bold === 'bold' ? <Divider /> : null}
          {`${getBulletPoint(depth)} ${category.name}`}
          {buttonGroup}
          {bold === 'bold' ? <Divider /> : null}
        </div>
      );
    }
  }

  render() {
    this.state.items = [];

    if (!this.props.data.categories || this.props.data.categories.length === 0) {
      return (<MagnifyLoader label='Generating category tree...' />);
    }

    if (this.props.categoryId) {
      this.makeTree(this.props.categoryId);
    } else {
      this.makeTree();
    }

    return (
      <div>
        <CategoryModal
          showModal={this.state.modalOpen}
          onClose={this.closeModal}
          category={this.state.currentCategory}
        />
        {this.state.items.map(item => item)}
          <AdminDeleteModal
              showModal={this.state.deleteModalOpen}
              onClose={this.toggleDeleteModal}
              deleteMessage="Are you sure you want to delete this category?"
              onSubmit={this.deleteCategory}
              category={this.state.id}
          />
      </div>);
  }
}

export default withRouter(connect(mapStateToProps)(EditCategoryTree));
