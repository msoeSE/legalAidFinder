import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import fetchCategories from '../actions/categoriesActions';
import { connect } from 'react-redux';
import Checkbox from "./Checkbox";

//Import styles
import styles from './AgencyCategoryTree.css';
import EligibilityCreator from "../Eligibility/EligibilityCreator";
import EligibilityModal from "../Eligibility/EligibilityModal";


function mapStateToProps(state) {
  return { data: state.categories };
}

let items = [];
let depth = 0;

class AgencyCategoryTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  // Recursive function that generates the checkboxes
  traverse = (category) => {
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
        items.push(this.createCheckbox(category, depth, true));
      } else {
        items.push(this.createCheckbox(category, depth, false));
      }

    } else {
      // Create branch node (label)
      if(category.parent === null){
        items.push(this.createCheckbox(category, depth, false, true));
      } else {
        items.push(this.createCheckbox(category, depth, false));
      }
    }

    // Iterate though all keys in the category object
    for (let key in category) {
      if (!category.hasOwnProperty(key))
        continue;
      // Recursive call if category has subcategories
      if (key === 'subcategories') {
        if (category[key] !== null && typeof(category[key]) === "object") {
          //going one step down in the object tree!!
          ++depth;

          category[key].forEach((element) => {
            if(typeof(element) === "string"){
              this.traverse(this.findCategory(element));
            } else {
              this.traverse(this.findCategory(element._id));
            }
          });
          --depth;
        }
      }
    }
  };

  makeTree() {
    this.props.data.categories.map(category => {
      if (category.parent === null) {
        depth = 0;
        this.traverse(category);
      }
    });
  }

  toggleModal = (isChecked) => {
      this.setState({
        modalOpen: !this.state.modalOpen,
      });
  };

  toggleCheckbox = (agencyId, categoryId, pushAgency) => {
    this.toggleModal();
    //this.props.dispatch(addOrRemoveAgencyFromCategoryRequest(agencyId, categoryId, pushAgency));
  };

  createCheckbox = (category, depth, checked, isTopParent = false) => {
    if (category.subcategories && category.subcategories.length === 0) {
      return (
        <div key={category._id} style={{marginLeft: 25 * depth + 'px'}}>
          <Checkbox
            label={category.name}
            handleCheckboxChange={this.toggleCheckbox}
            //agencyId={this.props.agencyId}
            categoryId={category._id}
            checked={checked}
          />
        </div>
      );
    } else {
      if(isTopParent) {
        return (
          <div key={category._id} style={{marginLeft: 25 * depth + 'px'}}>
            <h2 className='underline'>{category.name}</h2>
          </div>
        );
      } else {
        return (
          <div key={category._id} style={{marginLeft: 25 * depth + 'px'}}>
            <h4 className={`${styles['underline']}`}>{category.name}</h4>
          </div>
        );
      }
    }
  };

  //Find the appropriate category based off of the category ID
  findCategory = (categoryId) => {
    let elementPos = this.props.data.categories.map(function (x) {
      return x._id;
    }).indexOf(categoryId);
    return this.props.data.categories[elementPos];
  };

  render() {
    this.makeTree();
    return (
      <div>
        <h1>Select which categories your agency can provide legal services for:</h1>
        <EligibilityModal
          showModal={this.state.modalOpen}
          onClose={this.toggleModal}
          //eligibility={{ category: '5a04f8d1f9c010051c0426ce', agency: '5a04d2e3ec140922c08a6717' }}
        />
        {items.map(item => {
          return item
        })}
      </div>
    );
  };
}

export default withRouter(connect(mapStateToProps)(AgencyCategoryTree));
