import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button, Header, Table } from 'semantic-ui-react';

function mapStateToProps(state) {
  return { data: state.agencies };
}

class AgencyDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      emails: [ { address: '' } ],
      phone: '',
      operation: [ { hours: '' } ],
    };
  }

  render() {
    return (
      <div>
        <div>
          <form>
            <Input
              placeholder='Phone Number' label='Phone Number ' labelPosition='left'
              size='big' fluid className='padding'
                // onChange={this.agencyName.bind(this)} value={this.state.name}
            />
            <Input
              placeholder='Email' label='Email ' labelPosition='left'
              size='big' fluid className='padding'
                // onChange={this.agencyName.bind(this)} value={this.state.name}
            />
            <Header as='h3' textAlign='center'>
              Hours Of Operation
            </Header>

            <Table compact={true}>
              <Table.Header>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>Monday</Table.HeaderCell>
                  <Table.HeaderCell>Tuesday</Table.HeaderCell>
                  <Table.HeaderCell>Wednesday</Table.HeaderCell>
                  <Table.HeaderCell>Thursday</Table.HeaderCell>
                  <Table.HeaderCell>Friday</Table.HeaderCell>
                  <Table.HeaderCell>Saturday</Table.HeaderCell>
                  <Table.HeaderCell>Sunday</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Input focus placeholder='Hours' />
                  </Table.Cell>
                  <Table.Cell>
                    <Input focus placeholder='Hours' />
                  </Table.Cell>
                  <Table.Cell>
                    <Input focus placeholder='Hours' />
                  </Table.Cell>
                  <Table.Cell>
                    <Input focus placeholder='Hours' />
                  </Table.Cell>
                  <Table.Cell>
                    <Input focus placeholder='Hours' />
                  </Table.Cell>
                  <Table.Cell>
                    <Input focus placeholder='Hours' />
                  </Table.Cell>
                  <Table.Cell>
                    <Input focus placeholder='Hours' />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyDisplay));
