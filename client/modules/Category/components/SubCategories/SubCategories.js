import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Style
import styles from './SubCategories.css';

class SubCategory extends React.Component {
  handleClick() {
    if (this.props.category.subcategories.length > 0) {
      console.log('Has cats');
    } else {
      console.log('No subcats');
    }
  }

  render() {
    return (
      <div className={styles['single-category']}>
        {/*<button onClick={(e) => this.handleClick(e)} >*/}
          {/*{this.props.category.name}*/}
        {/*</button>*/}

        <Link to={`/categories/${this.props.category._id}`} onClick={(e) => this.handleClick(e)}>
          {this.props.category.name}
        </Link>
      </div>
    );
  }
}

SubCategory.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parent: PropTypes.string,
    subcategories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default (SubCategory);
