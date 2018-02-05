import React, { Component } from 'react';
import { Tab, Container, Header } from 'semantic-ui-react';
import AgencyAdd from './Agency/AgencyAdd';
import AgencyDelete from './Agency/AgencyDelete';
import AgencyModify from './Agency/AgencyModify';
import CategoryTab from './Category/CategoryTab';
import CategoryAdd from './Category/CategoryAdd';
import CategoryDelete from './Category/CategoryDelete';

class AdminPage extends Component {
  render() {
    const panes = [
      { menuItem: 'Add Agency', render: () => <Tab.Pane><div className='tab-content'>
        <Container fluid textAlign='center'>
          <Header as='h2'>Add a new Agency</Header>
          <AgencyAdd />
        </Container>
      </div></Tab.Pane> },
        { menuItem: 'Delete Agency', render: () => <Tab.Pane><div className='tab-content'>
        <Container fluid textAlign='center'>
          <Header as='h2'>Delete an existing Agency</Header>
          <AgencyDelete />
        </Container>
      </div></Tab.Pane> },
        { menuItem: 'Edit Agency', render: () => <Tab.Pane><div className='tab-content'>
        <Container fluid textAlign='center'>
          <Header as='h2'>Edit an existing Agency</Header>
          <AgencyModify />
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
      </div></Tab.Pane> }
    ]
    return (
      <div>
        <Tab panes={panes} />
      </div>
    );
  }
}

export default AdminPage;
