import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Style
import styles from './CategoryListItem.css';

class CategoryListItem extends React.Component {
  render() {
    return (
      <div className={styles['single-category']}>
        <h3 className={styles['category-title']}>
          <Link to={`/categories/${this.props.category._id}`}>
            {this.props.category.name}
          </Link>
        </h3>
        <hr className={styles.divider} />
      </div>
    );
  }
}

CategoryListItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parent: PropTypes.object,
    subcategories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryListItem;
