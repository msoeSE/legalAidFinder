import React, { Component } from 'react';
import AgencyCategoryTree from "./AgencyCategoryTree";
import { Tab, Container, Header } from 'semantic-ui-react';

class AgencyHome extends Component {
    render() {
      const panes = [
        { menuItem: 'Home', render: () => <Tab.Pane><div className='tab-content'>
            <Container fluid textAlign='center'>
                <Header as='h2'>Agency Name Goes Here</Header>
            </Container>
        </div></Tab.Pane> },
        { menuItem: 'Category', render: () => <Tab.Pane><div className='tab-content'>
            <Container fluid>
              <Header as='h2' textAlign='center'>Select which categories your agency can provide legal services for:</Header>
              <AgencyCategoryTree/>
            </Container>
        </div></Tab.Pane> },
        { menuItem: 'Eligibility', render: () => <Tab.Pane><div className='tab-content'>
            <Container fluid textAlign='center'>
                <Header as='h2'>View Eligibility</Header>
            </Container>
        </div></Tab.Pane> },
      ];
        return (
          <Tab panes={panes} />
        );
    }
}

export default AgencyHome;