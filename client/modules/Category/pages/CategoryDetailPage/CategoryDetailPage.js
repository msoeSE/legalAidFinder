import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Style
import styles from '../../components/CategoryListItem/CategoryListItem.css';

// Import Actions
import { fetchCategory } from '../../CategoryActions';

// Import Selectors
import { getCategory } from '../../CategoryReducer';

export function CategoryDetailPage(props) {
  return (
    <div>
      <Helmet title={props.category.name} />
      <div className={`${styles['single-category']} ${styles['category-detail']}`}>
        <h3 className={styles['category-title']}>{props.category.name}</h3>
        {props.category.subcategories.map((object, i) =>
          <Link className={styles['category-desc']} key={i} to={`/categories/${object._id}`} >
            {object.name}
          </Link>)
        }
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
CategoryDetailPage.need = [params => {
  return fetchCategory(params._id);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    category: getCategory(state, props.params._id),
  };
}

CategoryDetailPage.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // parent: PropTypes.string.isRequired,
    subcategories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(CategoryDetailPage);
