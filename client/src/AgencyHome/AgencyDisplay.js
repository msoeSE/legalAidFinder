import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Divider,
  Header,
  Segment,
  Modal,
  Input,
} from 'semantic-ui-react';
import {fetchAgencies, modifyAgencies} from '../Actions/agenciesActions';
import { updateAgency } from '../Actions/userActions';

function mapStateToProps(state) {
  return { data: state.agencies, user: state.user };
}

class AgencyDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.updateAgency = this.updateAgency.bind(this);
  }

  updateAgency(data) {
    const newData = {
      ...data,
      name: this.props.user.agency.name,
      url: this.props.user.agency.url,
      query: { _id: this.props.user.agency._id },
      emails: [],
    };

    this.props.user.agency.emails.forEach((e) => {
      if (e !== null)
        newData.emails.push({ address: e });
    });

    return this.props.dispatch(modifyAgencies(newData)).then(() => {
      if (!this.props.data.error) {
        this.props.dispatch(fetchAgencies()).then(() => {
          this.props.dispatch(updateAgency(this.props.data.agencies.find(x => {
            return x._id === this.props.user.agency._id;
          })));
        });
        return true;
      } else {
        return false;
      }
    });
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '0em 1em' }} vertical>
          <Container text>
            <Divider />
            <Header as='h3' style={{ fontSize: '1.5em' }}>Emails:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.emails.map(email =>
                <div>{email}</div>)}
            </p>
            <Header as='h3' style={{ fontSize: '1.5em' }}>Phone Number:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.phone !== undefined ? <div className='phoneNum'>
                {this.props.agency.phone} </div> : <div className='noPhone'>There is currently no phone number on file for this agency!</div>}
            </p>
            <Header as='h3' style={{ fontSize: '1.5em' }}>Agency Website:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.url !== undefined ? <div className='phoneNum'>
                {this.props.agency.url} </div> : <div className='noPhone'>There is currently no URL on file for this agency!</div>}</p>
            <Header as='h3' style={{ fontSize: '1.5em' }}>Hours of Operation Link:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.operation !== undefined ? <div className='phoneNum'>
                {this.props.agency.operation} </div> : <div className='noPhone'>There is currently no hours of operation link on file for this agency!</div>}</p>
            <AgencyHomeModal
              showModal
              onClose={this.toggleModal}
              agency={this.props.agency}
              update={this.updateAgency}
            />
          </Container>
        </Segment>
      </div>
    );
  }
}

class AgencyHomeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      operation: '',
    };
  }
  phoneNumber(event) {
    this.setState({ phone: event.target.value, msg: '' });
  }

  hoursOfOperation(event) {
    this.setState({ operation: event.target.value, msg: '' });
  }

  updateAgency(event) {
    event.preventDefault();
    const data = {
      name: this.props.agency.name,
    };

    data.phone = (this.state.phone === '' && this.props.agency.phone) ? this.props.agency.phone : this.state.phone;

    data.operation = (this.state.operation === '' && this.props.agency.operation) ? this.props.agency.operation : this.state.operation;

    this.props.update(data).then((result) => {
      if (result) {
        const message = 'Your changes have been saved!';
        this.setState({ msg: message, name: '', phone: '', operation: '' });
      } else {
        const message = 'Your changes have failed to save.';
        this.setState({ msg: message });
      }
    });
  }
  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div>
        <Modal trigger={<Button floated='right' className='large ui green button'>Edit</Button>} closeIcon>
          <Modal.Header style={{ textAlign: 'center' }}>
            {this.props.agency.name}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Input
                placeholder={this.props.agency.phone} label='Phone Number ' labelPosition='left'
                size='big' fluid className='padding'
                onChange={this.phoneNumber.bind(this)} value={this.state.phone}
              />
              <Input
                placeholder={this.props.agency.operation} label='Hours of Operation Link' labelPosition='left'
                size='big' fluid className='padding'
                onChange={this.hoursOfOperation.bind(this)} value={this.state.operation}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button className='ui blue button' onClick={this.updateAgency.bind(this)}>
              Save Changes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(AgencyDisplay));
