import React, { Component } from 'react';
import { Tab, Container, Header, Menu, Label, Divider } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AgencyRequests from './Agency/AgencyRequests';
import CategoryTab from './Category/CategoryTab';
import CategoryAdd from './Category/CategoryAdd';
import CategoryDelete from './Category/CategoryDelete';
import EligibilityTypeAdd from './EligibilityType/EligibilityTypeAdd';
import AddNewAdmin from './AddAdmin';
import RemoveAdmin from './RemoveAdmin';
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
      { menuItem: 'Add Category',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Add a Category</Header>
          </Container>
          <CategoryAdd />
        </div></Tab.Pane> },
      { menuItem: 'Delete Category',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Delete a Category</Header>
          </Container>
          <CategoryDelete />
        </div></Tab.Pane> },
      { menuItem: 'Edit Category',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Edit the Categories</Header>
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
          <Container fluid textAlign='center'>
            <Header as='h2'>Add New Admin</Header>
          </Container>
          <AddNewAdmin />
          <Divider />
          <Container fluid textAlign='center'>
            <Header as='h2'>Remove Admin</Header>
          </Container>
          <RemoveAdmin />
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
