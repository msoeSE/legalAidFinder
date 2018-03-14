import React, { Component } from 'react';
import { Tab, Container, Header, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import AgencyCategoryTab from './AgencyCategoryTab';
import AgencyDisplay from './AgencyDisplay';
import { fetchCategories } from '../Actions/categoriesActions';

function mapStateToProps(state) {
  return { data: state.categories, user: state.user };
}

class AgencyHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency: props.agency,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    if (!this.props.user.email || !this.props.user.agency) {
      return (
        <Redirect to='/' />
      );
    }

    if (this.props.data.categories.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    const panes = [
      { menuItem: 'Home',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Welcome {this.props.user.agency.name}!</Header>
            <AgencyDisplay />
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
    ];

    panes.push(
      );

    return (
      <Tab panes={panes} />
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyHome));
