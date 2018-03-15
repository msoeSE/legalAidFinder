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

            <Table textAlign='center'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Monday</Table.HeaderCell>
                  <Table.Cell>
                    <Input focus placeholder='Open' className='padding' />
                    <div className='ui mini buttons'>
                      <button className='ui toggle button'>AM</button>
                      <div className='or' />
                      <button className='ui toggle button '>PM</button>
                    </div>
                    <i className='minus icon' />
                    <Input focus placeholder='Close' className='padding' />
                    <div className='ui mini buttons'>
                      <button className='ui toggle positive button'>AM</button>
                      <div className='or' />
                      <button className='ui toggle button '>PM</button>
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Tuesday</Table.HeaderCell>
                  <Table.Cell>
                    <Input focus placeholder='Open' className='padding' />
                    <i className='minus icon' />
                    <Input focus placeholder='Close' className='padding' />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Wednesday</Table.HeaderCell>
                  <Table.Cell>
                    <Input focus placeholder='Open' className='padding' />
                    <i className='minus icon' />
                    <Input focus placeholder='Close' className='padding' />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Thursday</Table.HeaderCell>
                  <Table.Cell>
                    <Input focus placeholder='Open' className='padding' />
                    <i className='minus icon' />
                    <Input focus placeholder='Close' className='padding' />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Friday</Table.HeaderCell>
                  <Table.Cell>
                    <Input focus placeholder='Open' className='padding' />
                    <i className='minus icon' />
                    <Input focus placeholder='Close' className='padding' />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Saturday</Table.HeaderCell>
                  <Table.Cell>
                    <Input focus placeholder='Open' className='padding' />
                    <i className='minus icon' />
                    <Input focus placeholder='Close' className='padding' />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Sunday</Table.HeaderCell>
                  <Table.Cell>
                    <Input focus placeholder='Open' className='padding' />
                    <i className='minus icon' />
                    <Input focus placeholder='Close' className='padding' />
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
            </Table>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyDisplay));
