import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import Components
import CategoryList from '../../components/CategoryList';
import CategoryCreateWidget from '../../components/CategoryCreateWidget/CategoryCreateWidget';
import AgencyCategoryTree from '../../../Agency/components/AgencyCategoryTree/AgencyCategoryTree'

// Import styles
import styles from '../../components/CategoryListItem/CategoryListItem.css';

// Import Actions
import { addCategoryRequest, fetchCategories, deleteCategoryRequest } from '../../CategoryActions';
import { toggleAddCategories } from '../../../App/AppActions';

// Import Selectors
import { getShowAddCategories } from '../../../App/AppReducer';
import { getCategories } from '../../CategoryReducer';

class CategoryListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  handleDeleteCategory = category => {
    if (confirm('Do you want to delete this category')) { // eslint-disable-line
      this.props.dispatch(deleteCategoryRequest(category));
    }
  };

  handleAddCategory = (name, parent, subcategories) => {
    this.props.dispatch(toggleAddCategories());
    this.props.dispatch(addCategoryRequest({ name, parent, subcategories }));
  };

  render() {
    return (
      <div>
        <div>
          <h2 className={`${styles['single-category']} ${styles['category-title']}`}>Select a category that corresponds with your legal issue:</h2>
        </div>
        {/* <CategoryCreateWidget addCategory={this.handleAddCategory} showAddCategory={this.props.showAddCategory} /> */}
        <CategoryList categories={this.props.categories} />
        <AgencyCategoryTree categories={this.props.categories} agencyid='5a04d2e3ec140922c08a6713'/>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
CategoryListPage.need = [() => { return fetchCategories(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddCategory: getShowAddCategories(state),
    categories: getCategories(state),
  };
}

CategoryListPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    parent: PropTypes.object,
    subcategories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
  showAddCategory: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CategoryListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CategoryListPage);
