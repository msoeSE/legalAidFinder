import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { fetchCategories } from '../../actions/categoriesActions';
import CategoryModal from '../Category/CategoryModal';

function mapStateToProps(state) {
  return { data: state.categories };
}

class CategoryTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      items: [],
      depth: 0,
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
    if (this.state.items.some(e => e._id === category._id)){
      return;
    }

    // Check if the agency exists in a leaf node
    if (category.agencies && category.agencies.length > 0) {
      let contains = false;
      category.agencies.forEach((agency) => {
        if (agency._id === this.props.agencyId) {
          contains = true;
        }
      });

      // Determine to check the checkbox if agency exists in leaf node
      if (contains) {
        this.state.items.push(this.createCheckbox(category, this.state.depth, true));
      } else {
        this.state.items.push(this.createCheckbox(category, this.state.depth, false));
      }
    } else {
      // Create branch node (label)
      if (category.parent === null) {
        this.state.items.push(this.createCheckbox(category, this.state.depth, false, true));
      } else {
        this.state.items.push(this.createCheckbox(category, this.state.depth, false));
      }
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

  makeTree(categoryID = 0) {
    let filteredCategories = this.props.data.categories.filter(category => category.parent === null);
    if (categoryID !== 0) {
      filteredCategories = this.props.data.categories.filter(category => category._id === categoryID);
    }

    filteredCategories.map((category) => { // eslint-disable-line array-callback-return
      this.state.depth = 0;
      this.traverse(category);
    });
  }

  createCheckbox(category, depth, checked, isTopParent = false) {
    if (category.subcategories && category.subcategories.length === 0) {
      return (
        <div key={category._id} style={{ marginLeft: `${25 * depth}px` }}>
          <Button onClick={this.openModal} compact basic color='brown' size='small' id={category._id}><b>{category.name}</b></Button>
        </div>
      );
    } else if (isTopParent) {
      return (
        <div key={category._id} style={{ marginLeft: `${25 * depth}px` }}>
          <Button onClick={this.openModal} compact basic color='black' size='huge' id={category._id}><b><u>{category.name}</u></b></Button>
        </div>
      );
    } else {
      return (
        <div key={category._id} style={{ marginLeft: `${25 * depth}px` }}>
          <Button onClick={this.openModal} compact basic color='black' size='large' id={category._id}><b>{category.name}</b></Button>
        </div>
      );
    }
  };

  // Find the appropriate category based off of the category ID
  findCategory(categoryID) {
    const elementPos = this.props.data.categories.map(x => x._id).indexOf(categoryID);
    return this.props.data.categories[elementPos];
  }

  openModal(event, data) {
    let category = this.findCategory(data.id);
    console.log(category)
    this.setState({
      modalOpen: !this.state.modalOpen,
      currentCategory: category,
    });
  }

  closeModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    this.state.items = [];

    if (!this.props.data.categories || this.props.data.categories.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    if (this.props.categoryID) {
      this.makeTree(this.props.categoryID);
    } else {
      this.makeTree();
    }

    return (<div>
      <CategoryModal
        showModal={this.state.modalOpen}
        onClose={this.closeModal}
        category={this.state.currentCategory}
      />
      {this.state.items.map(item => item)}
    </div>);
  }
}

export default withRouter(connect(mapStateToProps)(CategoryTree));