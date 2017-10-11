import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

// Import Style
import styles from './AgencyListItem.css';

class AgencyListItem extends React.Component {
  render() {
    return (
      <div className={styles['single-category']}>
        <h3 className={styles['category-title']}>
          <Link to={`/agencies/${this.props.agency._id}`}>
            {this.props.agency.name}
          </Link>
        </h3>
        <hr className={styles.divider} />
      </div>
    );
  }
}

AgencyListItem.propTypes = {
  agency: PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.array,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AgencyListItem;
