import React, { Component } from 'react';
import { Tab, Container, Header, Menu, Label, Divider } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AgencyRequests from './Agency/AgencyRequests';
import CategoryTab from './Category/CategoryTab';
import EligibilityTypeAdd from './EligibilityType/EligibilityTypeAdd';
import AddNewAdmin from './AddAdmin';
import RemoveAdmin from './RemoveAdmin';
import HomePageTab from './HomePage/HomePageTab.js';
import Agency from './Agency/Agency';
import { fetchAgencyRequests } from '../Actions/agencyRequestsActions';

function mapStateToProps(state) {
  return { data: state.categories, user: state.user, requests: state.agencyRequests.requests };
}

class AdminPage extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAgencyRequests());
  }

  render() {
    if (!this.props.user.email || !this.props.user.admin) {
      return (
        <Redirect to='/' />
      );
    }

    const panes = [
      { menuItem: <Menu.Item key='requests'>Agency Requests<Label>{this.props.requests.length}</Label></Menu.Item>,
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Agency Requests</Header>
            <AgencyRequests />
          </Container>
        </div></Tab.Pane> },
      { menuItem: 'Agency Tools',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Agency Tools</Header>
            <Agency />
          </Container>
        </div></Tab.Pane> },
      { menuItem: 'Category Tools',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Category Tools</Header>
          </Container>
          <CategoryTab />
        </div></Tab.Pane> },
        { menuItem: 'Eligibility Types',
            render: () => <Tab.Pane><div className='tab-content'>
                <Container fluid textAlign='center'>
                    <Header as='h2'>Eligibility Types</Header>
                </Container>
                <EligibilityTypeAdd />
            </div></Tab.Pane> },
        { menuItem: 'Edit Admins',
          render: () => <Tab.Pane><div className='tab-content'>
            <Container fluid textAlign='center' style={{ paddingTop: '10px' }}>
              <Header as='h2'>Add New Admin</Header>
            </Container>
            <AddNewAdmin />
            <Divider style={{ background: '#434343', borderBottom: '1px solid black' }} />
            <Container fluid textAlign='center'>
              <Header as='h2'>Remove Admin</Header>
            </Container>
            <RemoveAdmin />
          </div></Tab.Pane> },
        { menuItem: 'Home Page',
            render: () => <Tab.Pane><div className='tab-content'>
                <Container fluid textAlign='center'>
                    <Header as='h2'>Home Page</Header>
                </Container>
                <HomePageTab />
            </div></Tab.Pane> },
    ];
    return (
      <div>
        <Tab panes={panes} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminPage);
