import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Style
import styles from './CategoryListItem.css';

function CategoryListItem(props) {
  return (
    <div className={styles['single-category']}>
      <h3 className={styles['category-title']}>
        <Link to={`/categories/${props.category._id}`} >
          {props.category.name}
        </Link>
      </h3>
      {/* <p className={styles['category-desc']}>{props.category.parent}</p> */}
      {/* <p className={styles['category-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteCategory" /></a></p> */}
      <hr className={styles.divider} />
    </div>
  );
}

CategoryListItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parent: PropTypes.object,
    subcategories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryListItem;
