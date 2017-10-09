import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import CategorySubCategories from '../../components/SubCategories/SubCategories';

// Import Style
import styles from '../../components/CategoryListItem/CategoryListItem.css';

// Import Actions
import { fetchCategory } from '../../CategoryActions';

// Import Selectors
import { getCategory } from '../../CategoryReducer';

export class CategoryDetailPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={this.props.category.name} />
        <div className={`${styles['single-category']} ${styles['category-detail']}`}>
          <h3 className={styles['category-title']}>{this.props.category.name}</h3>
          {this.props.category.subcategories.map((object, i) =>
            <CategorySubCategories category={object} key={i} />
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
    parent: PropTypes.object,
    subcategories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(CategoryDetailPage);
