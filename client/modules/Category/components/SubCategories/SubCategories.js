import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Style
import styles from './SubCategories.css';

// Import Routes
import routes from '../../../../routes.js';

class SubCategory extends React.Component {
  handleClick() {
    if (this.props.category.subcategories.length > 0) {
      console.log('Has subcats');
    } else {
      console.log('No subcats');
    }
  }

  render() {
    return (
      <div className={styles['single-category']}>
        <button onClick={(e) => this.handleClick(e)} >
          {this.props.category.name}
        </button>
      </div>
    );
  }
}

SubCategory.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parent: PropTypes.object.isRequired,
    subcategories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubCategory;
