import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CategoryListItem from './CategoryListItem/CategoryListItem';

class CategoryList extends React.Component {
  render() {
    return (
      <div className="listView">
      {
        this.props.categories.map(category => {
          return category.parent === null ?
            <CategoryListItem
              key={category._id}
              category={category}
            />
            : null;
        })
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
    subcategories: PropTypes.array,
  })).isRequired,
};

export default CategoryList;
