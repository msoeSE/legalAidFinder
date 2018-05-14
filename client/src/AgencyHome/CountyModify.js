import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Loader, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCounties, addCountyToAgency } from '../Actions/countiesActions';
import CountyCheckbox from './CountyCheckbox';
import { fetchAgencies } from '../Actions/agenciesActions';

function mapStateToProps(state) {
  return { data: state.counties, agency: state.agencies };
}

class CountyModify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency: null,
      isChecked: this.props.checked
    };

    this.updateAgencyCounty = this.updateAgencyCounty.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCounties());
    this.props.dispatch(fetchAgencies());
  }

  updateAgencyCounty(agencyId, countyName, pushCounty) {
    this.props.dispatch(addCountyToAgency(agencyId, countyName, pushCounty)).then(() => {
      this.props.dispatch(fetchAgencies());
    });
  }

  checkCounty() {
    const sortedCountiesList = this.props.data.counties.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) { // sort string ascending
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0; // default return value (no sorting)
    });

    let rows = [];
    return sortedCountiesList.map((c, index) => {
      if (index % 8 === 0) {
        rows = [];
        return (<tr key={index*11}>{rows}</tr>);
      }

      if (!this.state.agency.counties) {
        rows.push (<td><CountyCheckbox
          county={c}
          handleCheckboxChange={this.updateAgencyCounty}
          agencyId={this.props.agencyId}
          checked={false}
          key={index}
        /></td>);
      } else {
        const checked = this.state.agency.counties.find(x => x === c.name) !== undefined;
        rows.push (<td><CountyCheckbox
          county={c}
          handleCheckboxChange={this.updateAgencyCounty}
          agencyId={this.props.agencyId}
          checked={checked}
          key={index}
        /></td>);
      }
    });
  }

  render() {
    if (!this.props.data.counties || this.props.data.counties.length === 0 || this.props.agency.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    this.state.agency = this.props.agency.agencies.find(x => x._id === this.props.agencyId);

    return (<div align="left">
      <table>
        <tbody>
          {this.checkCounty()}
        </tbody>
      </table>
    </div>);
  }
}

export default withRouter(connect(mapStateToProps)(CountyModify));
