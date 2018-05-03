import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCategories, addAgencyToCategories } from '../Actions/categoriesActions';
import Checkbox from './CategoryCheckbox';

import EligibilityModal from '../Eligibility/EligibilityModal';
import { fetchEligibilities, fetchEligibilityType } from '../Actions/eligibilityActions';
import { getEligibility } from '../Reducers/eligibilityReducer';
import MagnifyLoader from '../Helpers/MagnifyLoader';

export const BULLETPOINTS = [ '▶', '●', '◻', '◆', '◇', '✱', '⚽' ];

function mapStateToProps(state) {
  return { data: state.categories, info: state.eligibility };
}

class AgencyCategoryTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      items: [],
      depth: 0,
      innerDepth: 0,
      created: false,
      currentCategory: null,
    };

    this.updateAgencyCategory = this.updateAgencyCategory.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.editEligibility = this.editEligibility.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchEligibilities());
    this.props.dispatch(fetchEligibilityType());
  }

  // Recursive function that generates the checkboxes
  traverse(category) {
    if (this.state.items.some(e => e._id === category._id)) {
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

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  updateAgencyCategory(agencyId, categoryId, pushAgency) {
    this.props.dispatch(addAgencyToCategories(agencyId, categoryId, pushAgency)).then(() => {
      this.props.dispatch(fetchCategories());
    });
  }

  editEligibility(categoryId) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      currentCategory: categoryId,
    });
  }

  createCheckbox(category, depth, checked, isTopParent = false) {
    let bullet = null;
    if (this.state.depth - 1 < BULLETPOINTS.length) {
      bullet = BULLETPOINTS[this.state.depth - 1];
    }

    if (category.subcategories && category.subcategories.length === 0) {
      return (
        <div key={category._id} style={{ marginLeft: `${50 * depth}px`, marginTop: '5px' }}>
          <Checkbox
            label={category.name}
            handleCheckboxChange={this.updateAgencyCategory}
            handleEditEligibility={this.editEligibility}
            agencyId={this.props.agencyId}
            categoryId={category._id}
            checked={checked}
            eligibility={getEligibility(this.props.info, this.props.agencyId, category._id)}
            eligibilityTypes={this.props.info.eligibilityTypes}
            depth={bullet}
          />
        </div>
      );
    } else if (isTopParent) {
      return (
        <div key={category._id} style={{ marginLeft: `${50 * depth}px`, marginTop: '10px' }}>
          <h2 className='underline'>{category.name}</h2>
        </div>
      );
    } else {
      let bold = 'normal';
      if (depth === 1) {
        bold = 'bold';
      }

      return (
        <div key={category._id} style={{ marginLeft: `${50 * depth}px`, marginTop: `${25}px` }}>
          {bold === 'bold' ? <Divider /> : null}
          <p style={{ fontWeight: bold }}>{`${bullet} ${category.name}`}</p>
          {bold === 'bold' ? <Divider /> : null}
        </div>
      );
    }
  }

  // Find the appropriate category based off of the category ID
  findCategory(categoryId) {
    const elementPos = this.props.data.categories.map(x => x._id).indexOf(categoryId);
    return this.props.data.categories[elementPos];
  }

  render() {
    this.state.items = [];

    if (!this.props.data.categories || this.props.data.categories.length === 0 || !this.props.info.eligibility) {
      return (<MagnifyLoader label='Generating category tree...' />);
    }

    if (this.props.categoryId) {
      this.makeTree(this.props.categoryId);
    } else {
      this.makeTree();
    }

    return (<div>
      <EligibilityModal
        showModal={this.state.modalOpen}
        onClose={this.toggleModal}
        eligibility={getEligibility(this.props.info, this.props.agencyId, this.state.currentCategory)}
        category={this.state.currentCategory}
        agency={this.props.agencyId}
      />
      {this.state.items.map(item => item)}
    </div>);
  }
}

export default withRouter(connect(mapStateToProps)(AgencyCategoryTree));
