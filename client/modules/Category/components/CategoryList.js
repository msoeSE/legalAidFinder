import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CategoryListItem from './CategoryListItem/CategoryListItem';

function CategoryList(props) {
  return (
    <div className="listView">
      {
        props.categories.map(category => (
          <CategoryListItem
            key={category._id}
            category={category}
            parent={category.parent}
            subcategories={category.subcategories}
            _id={category._id}
            onDelete={() => props.handleDeleteCategory(category._id)}
          />
        ))
      }
    </div>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    parent: PropTypes.ObjectId,
    subcategories: PropTypes.ObjectId,
  })).isRequired,
  handleDeleteCategory: PropTypes.func.isRequired,
};

export default CategoryList;
