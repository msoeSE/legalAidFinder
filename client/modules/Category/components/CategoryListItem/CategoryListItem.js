import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Style
import styles from './CategoryListItem.css';

class CategoryListItem extends React.Component {
  render() {
    // if (this.props.category.agencies.length > 0) {
    //   return (
    //     this.props.category.agencies.map((agency) =>
    //       <div className={styles['single-category']}>
    //         <h3 className={styles['category-title']}>
    //           {agency.name}
    //         </h3>
    //       </div>
    //     )
    //   );
    // } else {
      return (
        <div className={`${styles['single-category']}`}>
          <h3 className={styles['category-btn']}>
            {<Link className={styles['category-btn']} to={`/categories/${this.props.category._id}`}>
              {this.props.category.name}
            </Link>}
          </h3>
          {/*<hr className={styles.divider} />*/}
        </div>
      );
    }
  }
// }

CategoryListItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parent: PropTypes.string,
    subcategories: PropTypes.array,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryListItem;
