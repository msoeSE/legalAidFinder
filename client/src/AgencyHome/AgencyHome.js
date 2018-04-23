import React, { Component } from 'react';
import { Tab, Container, Header, Loader, Dropdown, Icon, Popup, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import AgencyCategoryTab from './AgencyCategoryTab';
import AgencyDisplay from './AgencyDisplay';
import AgencyDropdown from './AgencyDropdown';
import { fetchAgencies } from '../Actions/agenciesActions';
import CountyModify from './CountyModify';

function mapStateToProps(state) {
  return { data: state.agencies, user: state.user };
}

class AgencyHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency: props.agency,
      showDropdown: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchAgencies());
  }

  getAgencies() {
    const matchedAgencies = [];
    this.props.data.agencies.map(agency =>
      agency.emails.length > 0 ?
        agency.emails.map(email =>
          email === this.props.user.email ? matchedAgencies.push({ text: agency.name, value: agency }) : null,
        )
        : null,
    );
    return matchedAgencies;
  }

  render() {
    if (!this.props.user.email || !this.props.user.agency) {
      return (
        <Redirect to='/' />
      );
    }

    if (this.props.data.agencies.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    if (this.getAgencies().length > 1) {
      this.state.showDropdown = true;
    }

    const panes = [
      { menuItem: 'Home',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            {this.state.showDropdown ? <AgencyDropdown agencies={this.getAgencies()} user={this.props.user} /> : null}
            <Header as='h2' style={{ fontSize: '2em' }}>Welcome {this.props.user.agency.name}!</Header>
            <AgencyDisplay
              agency={this.props.user.agency}
            />
          </Container>
        </div></Tab.Pane> },
      { menuItem: 'Categories',
        render: () =>
          <Tab.Pane><div className='tab-content'>
            <Container fluid>
              <Header as='h2' textAlign='center'>Select which categories your agency can provide legal services for:</Header>
              <AgencyCategoryTab />
            </Container>
          </div></Tab.Pane> },
      { menuItem: 'Global Eligibility',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>View Global Eligibility</Header>
          </Container>
        </div></Tab.Pane> },
      { menuItem: 'Counties',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Edit Supported Counties</Header>
            <CountyModify agencyId={this.props.user.agency._id}/>
          </Container>
        </div></Tab.Pane> },
    ];

    panes.push(
      );

    return (
      <Tab panes={panes} />
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyHome));
