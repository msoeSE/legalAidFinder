import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import AgencyListItem from './AgencyListItem/AgencyListItem';
import CheckboxTree from 'react-checkbox-tree';

// Import Styles
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


class AgencyCategoryTree extends React.Component {
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
};

export default AgencyList;
