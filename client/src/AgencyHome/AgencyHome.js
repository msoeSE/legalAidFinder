import React, { Component } from 'react';
import { Tab, Container, Header } from 'semantic-ui-react';
import AgencyCategoryTree from './AgencyCategoryTree';

class AgencyHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency: props.agency,
    };
  }

  render() {
    const panes = [
      { menuItem: 'Home',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Agency Name Goes Here</Header>
          </Container>
        </div></Tab.Pane> },
      { menuItem: 'Category',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid>
            <Header as='h2' textAlign='center'>Select which categories your agency can provide legal services for:</Header>
            <AgencyCategoryTree agencyId='5a04d2e3ec140922c08a6713' />
          </Container>
        </div></Tab.Pane> },
      { menuItem: 'Eligibility',
        render: () => <Tab.Pane><div className='tab-content'>
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
