import React, { Component } from 'react';
import { Tab, Container, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AgencyAdd from './Agency/AgencyAdd';
import AgencyDelete from './Agency/AgencyDelete';
import AgencyModify from './Agency/AgencyModify';
import CategoryTab from './Category/CategoryTab';
import CategoryAdd from './Category/CategoryAdd';
import CategoryDelete from './Category/CategoryDelete';
import EligibilityTypeAdd from './EligibilityType/EligibilityTypeAdd';
import Agency from "./Agency/Agency";

function mapStateToProps(state) {
  return { data: state.categories, user: state.user };
}

class AdminPage extends Component {
  render() {
    if (!this.props.user.email || !this.props.user.admin) {
      return (
        <Redirect to='/' />
      );
    }

    const panes = [
      { menuItem: 'Agency Tools', render: () => <Tab.Pane><div className='tab-content'>
        <Container fluid textAlign='center'>
          <Header as='h2'>Agency Tools</Header>
          <Agency />
        </Container>
      </div></Tab.Pane> },
      { menuItem: 'Add Category', render: () => <Tab.Pane><div className='tab-content'>
        <Container fluid textAlign='center'>
          <Header as='h2'>Add a Category</Header>
        </Container>
        <CategoryAdd />
      </div></Tab.Pane> },
      { menuItem: 'Delete Category', render: () => <Tab.Pane><div className='tab-content'>
        <Container fluid textAlign='center'>
          <Header as='h2'>Delete a Category</Header>
        </Container>
        <CategoryDelete />
      </div></Tab.Pane> },
      { menuItem: 'Edit Category', render: () => <Tab.Pane><div className='tab-content'>
        <Container fluid textAlign='center'>
          <Header as='h2'>Edit the Categories</Header>
        </Container>
        <CategoryTab />
      </div></Tab.Pane> },
      { menuItem: 'Eligibility Types', render: () => <Tab.Pane><div className='tab-content'>
        <Container fluid textAlign='center'>
          <Header as='h2'>Eligibility Types</Header>
        </Container>
        <EligibilityTypeAdd />
      </div></Tab.Pane> }
    ];
    return (
      <div>
        <Tab panes={panes} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminPage);
