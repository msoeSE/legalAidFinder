import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

// Import Style
import styles from './EligibilityCreator.css';

class EligibilityCreator extends React.Component {
  addCategory = () => {
    const nameRef = this.refs.name;
    const parentRef = this.refs.parent;

    if (nameRef.value) {
      this.props.addCategory(nameRef.value, parentRef.value);
      nameRef.value = parentRef.value = '';
    }
  };
  render() {
    return (
      <div className={`${styles['single-category']}`}>
        <h3 className={styles['category-btn']}>
          {<Link className={styles['category-btn']} to={`/categories/${this.props.category._id}`}>
            {this.props.category.name}
          </Link>}
        </h3>
      </div>
    );
  }
}

EligibilityCreator.propTypes = {
  eligibility: PropTypes.shape({
    category: PropTypes.string.isRequired,
    agency: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    key_comparator_value:{
      key: PropTypes.string.isRequired,
      comparator: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    },
  }).isRequired,
};

export default EligibilityCreator;
