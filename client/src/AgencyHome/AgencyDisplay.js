import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button, Header, Table } from 'semantic-ui-react';
import { modifyAgencies } from '../Actions/agenciesActions';

function mapStateToProps(state) {
  return { data: state.agencies, user: state.user };
}

class AgencyDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      emails: [ { address: '' } ],
      operations: [ { hours: '' } ],
    };
  }

  phoneNumber(event) {
    this.setState({ phone: event.target.value, msg: '' });
  }

  updateAgency(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      emails: this.state.emails,
      operations: this.state.operations,
    };

    this.props.dispatch(modifyAgencies(data)).then(() => {
      if (!this.props.data.error) {
        const message = 'Your changes have been saved!';
        this.setState({ msg: message, name: '', phone: '', emails: [ { address: '' } ], operations: [ { hours: '' } ] });
      } else {
        const message = 'Your changes have failed to save.';
        this.setState({ msg: message });
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <Input
            placeholder={this.props.agency.phone} label='Phone Number ' labelPosition='left'
            size='big' fluid className='padding'
            onChange={this.phoneNumber.bind(this)} value={this.state.phone}
          />
          <Input
            placeholder={this.props.user.email} label='Email' labelPosition='left'
            size='big' fluid className='padding'
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
                    <button className='ui button' onClick={this.toggleButton}>AM</button>
                    <div className='or' />
                    <button className='ui button '>PM</button>
                  </div>
                  <i className='minus icon' />
                  <Input focus placeholder='Close' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Tuesday</Table.HeaderCell>
                <Table.Cell>
                  <Input focus placeholder='Open' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                  <i className='minus icon' />
                  <Input focus placeholder='Close' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Wednesday</Table.HeaderCell>
                <Table.Cell>
                  <Input focus placeholder='Open' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                  <i className='minus icon' />
                  <Input focus placeholder='Close' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Thursday</Table.HeaderCell>
                <Table.Cell>
                  <Input focus placeholder='Open' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                  <i className='minus icon' />
                  <Input focus placeholder='Close' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Friday</Table.HeaderCell>
                <Table.Cell>
                  <Input focus placeholder='Open' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                  <i className='minus icon' />
                  <Input focus placeholder='Close' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Saturday</Table.HeaderCell>
                <Table.Cell>
                  <Input focus placeholder='Open' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                  <i className='minus icon' />
                  <Input focus placeholder='Close' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Sunday</Table.HeaderCell>
                <Table.Cell>
                  <Input focus placeholder='Open' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                  <i className='minus icon' />
                  <Input focus placeholder='Close' className='padding' />
                  <div className='ui mini buttons'>
                    <button className='ui button'>AM</button>
                    <div className='or' />
                    <button className='ui button'>PM</button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Header>
          </Table>
          <Button className='large ui blue button' onClick={this.updateAgency.bind(this)}>Save Changes</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyDisplay));
