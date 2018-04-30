import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Divider, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../Actions/categoriesActions';
import MagnifyLoader from '../../Helpers/MagnifyLoader';
import CategoryModal from './CategoryModal';

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
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
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
    if (category.subcategories && category.subcategories.length === 0) {
      return (
        <div key={category._id} style={{ marginLeft: `${50 * depth}px`, marginTop: '5px' }}>
          {`${this.state.depth}) ${category.name}`}
          <Button.Group size='mini' style={{ marginLeft: '5px' }}>
            <Button animated='vertical' inverted onClick={this.openModal} color='green' id={category._id}>
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name='plus' />
              </Button.Content>
            </Button>
            <Button animated='vertical' inverted onClick={this.openModal} color='red' id={category._id}>
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name='minus' />
              </Button.Content>
            </Button>
          </Button.Group>
        </div>
      );
    } else if (isTopParent) {
      return (
        <div key={category._id} style={{ marginLeft: `${50 * depth}px`, marginTop: '10px' }}>
          <h2 className='underline'>{category.name}</h2>
          <Button.Group size='mini' style={{ marginLeft: '5px' }}>
            <Button animated='vertical' inverted onClick={this.openModal} color='green' id={category._id}>
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name='plus' />
              </Button.Content>
            </Button>
            <Button animated='vertical' inverted onClick={this.openModal} color='red' id={category._id}>
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name='minus' />
              </Button.Content>
            </Button>
          </Button.Group>
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
          {`${this.state.depth}) ${category.name}`}
          <Button.Group size='mini' style={{ marginLeft: '5px' }}>
            <Button animated='vertical' inverted onClick={this.openModal} color='green' id={category._id}>
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name='plus' />
              </Button.Content>
            </Button>
            <Button animated='vertical' inverted onClick={this.openModal} color='red' id={category._id}>
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name='minus' />
              </Button.Content>
            </Button>
          </Button.Group>
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
      </div>);
  }
}

export default withRouter(connect(mapStateToProps)(EditCategoryTree));
