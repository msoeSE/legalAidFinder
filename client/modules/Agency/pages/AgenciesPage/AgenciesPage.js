import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet'

// Import Components
import AgencyList from '../../components/AgencyList';

// Import Actions
import { fetchAgencies } from '../../AgencyActions';

// Import Selectors
import { getAgencies } from '../../AgencyReducer';
import {getCategories} from "../../../Category/CategoryReducer";

class AgencyListPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={this.props.agency.name} />
        <div>
        {this.props.category.agencies.map((agency, i) =>
          <div key={i} className={`${styles['single-category']} ${styles['category-detail']}`}>
            <a href={agency.url} className={styles['category-action']}>{agency.name}</a>
          </div>
        )}
        </div>
        {/*<AgencyList agencies={this.props.agencies} category={this.props.agencies.categories} />*/}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
AgencyListPage.need = [() => { return fetchAgencies(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    agencies: getAgencies(state),
  };
}

AgencyListPage.propTypes = {
  agencies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
  // category: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   parent: PropTypes.string,
  //   subcategories: PropTypes.array.isRequired,
  //   _id: PropTypes.string.isRequired,
  // })).isRequired,
};

export default connect(mapStateToProps)(AgencyListPage);
