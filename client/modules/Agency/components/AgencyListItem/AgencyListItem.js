import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

// Import Style
import styles from './AgencyListItem.css';

class AgencyListItem extends React.Component {
  render() {
    return (
      <div className={styles['single-agency']}>
        <h3 className={styles['agency-title']}>
          <a href={this.props.agency.url} className={styles['agency-action']}>{this.props.agency.name}</a>
        </h3>
        {/*<hr className={styles.divider} />*/}
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
