import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CategoryListItem from './CategoryListItem/CategoryListItem';

class CategoryList extends React.Component {
  render() {
    return (
      <div className="listView">
      {
        this.props.categories.map(category => (
          <CategoryListItem
            key={category._id}
            category={category}
            parent={category.parent}
            subcategories={category.subcategories}
            _id={category._id}
            onDelete={() => this.props.handleDeleteCategory(category._id)}
          />
        ))
      }
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    parent: PropTypes.object,
    subcategories: PropTypes.ObjectId,
  })).isRequired,
};

export default CategoryList;
