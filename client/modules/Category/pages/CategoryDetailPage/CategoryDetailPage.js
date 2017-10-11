import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Style
import styles from '../../components/CategoryListItem/CategoryListItem.css';

// Import Actions
import { fetchCategory } from '../../CategoryActions';

// Import Selectors
import { getCategory } from '../../CategoryReducer';
import CategoryListItem from '../../components/CategoryListItem/CategoryListItem';

export class CategoryDetailPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={this.props.category.name} />
        <div className={`${styles['single-category']} ${styles['category-detail']}`}>
          <h3 className={styles['category-title']}>{this.props.category.name}</h3>
          {this.props.category.subcategories.map((object, i) =>
            <CategoryListItem category={object} key={i} />
          )}
          {this.props.category.agencies.map((agency, i) =>
            <div key={i} className={`${styles['single-category']} ${styles['category-detail']}`}>
              <a href={agency.url} className={styles['category-action']}>{agency.name}</a>
            </div>
          )}
        </div>
      </div>
    );
  }
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
    parent: PropTypes.string,
    subcategories: PropTypes.array,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(CategoryDetailPage);
