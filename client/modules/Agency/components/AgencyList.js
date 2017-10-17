import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import AgencyListItem from './AgencyListItem/AgencyListItem';

class AgencyList extends React.Component {
  render() {
    return (
      <div className="listView">
      {
        this.props.agencies.map(agency => {
          return (
            <AgencyListItem
              key={agency._id}
              agency={agency}
            />
          );
        })
      }
      </div>
    );
  }
}

AgencyList.propTypes = {
  agencies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    categories: PropTypes.array,
  })).isRequired,
  category: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    parent: PropTypes.string,
    subcategories: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
};

export default AgencyList;
