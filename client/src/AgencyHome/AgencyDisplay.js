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
import { fetchAgencies, modifyAgencies } from '../Actions/agenciesActions';
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
      if (e !== null) { newData.emails.push({ address: e }); }
    });

    return this.props.dispatch(modifyAgencies(newData)).then(() => {
      if (!this.props.data.error) {
        this.props.dispatch(fetchAgencies()).then(() => {
          this.props.dispatch(updateAgency(this.props.data.agencies.find(x => x._id === this.props.user.agency._id)));
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
        <Segment style={{ paddingBottom: '2em' }} vertical>
          <Container text>
            <Divider />
            <Header as='h3' style={{ fontSize: '1.5em', textDecoration: 'underline' }}>Emails:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.emails.map(email =>
                <div>{email}</div>)}
            </p>
            <Header as='h3' style={{ fontSize: '1.5em', textDecoration: 'underline' }}>Address:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.address ? <div className='phoneNum'>
                {`${this.props.agency.address}\n` + `${this.props.agency.city}` + `, WI, ${this.props.agency.zipcode}`} </div> :
              <div className='noPhone'>There is currently no address on file for this agency!</div>}</p>
            <Header as='h3' style={{ fontSize: '1.5em', textDecoration: 'underline' }}>Phone Number:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.phone ? <div className='phoneNum'>
                {this.props.agency.phone} </div> : <div className='noPhone'>There is currently no phone number on file for this agency!</div>}
            </p>
            <Header as='h3' style={{ fontSize: '1.5em', textDecoration: 'underline' }}>Agency Website:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.url ? <div className='phoneNum'>
                {this.props.agency.url} </div> : <div className='noPhone'>There is currently no URL on file for this agency!</div>}</p>
            <Header as='h3' style={{ fontSize: '1.5em', textDecoration: 'underline' }}>Agency Contact Information:</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.agency.operation ? <div className='phoneNum'>
                {this.props.agency.operation} </div> :
              <div className='noPhone'>There is currently no contact link on file for this agency!</div>}</p>
            <div>
              <AgencyHomeModal
                showModal
                onClose={this.toggleModal}
                agency={this.props.agency}
                update={this.updateAgency}
              />
            </div>
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
      address: '',
      zipcode: '',
      city: '',
    };
  }
  phoneNumber(event) {
    this.setState({ phone: event.target.value, msg: '' });
  }

  hoursOfOperation(event) {
    this.setState({ operation: event.target.value, msg: '' });
  }

  addressSave(event) {
    this.setState({ address: event.target.value, msg: '' });
  }

  zipCode(event) {
    this.setState({ zipcode: event.target.value, msg: '' });
  }

  citySave(event) {
    this.setState({ city: event.target.value, msg: '' });
  }

  updateAgency(event) {
    event.preventDefault();
    const data = {
      name: this.props.agency.name,
    };

    data.phone = (this.state.phone === '' && this.props.agency.phone) ? this.props.agency.phone : this.state.phone;

    data.operation = (this.state.operation === '' && this.props.agency.operation) ? this.props.agency.operation : this.state.operation;

    data.address = (this.state.address === '' && this.props.agency.address) ? this.props.agency.address : this.state.address;

    data.zipcode = (this.state.zipcode === '' && this.props.agency.zipcode) ? this.props.agency.zipcode : this.state.zipcode;

    data.city = (this.state.city === '' && this.props.agency.city) ? this.props.agency.city : this.state.city;


    this.props.update(data).then((result) => {
      if (result) {
        const message = 'Your changes have been saved!';
        this.setState({ msg: message, name: '', phone: '', operation: '', address: '', zipcode: '', city: '' });
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
      <div style={{ paddingBottom: '0.5em' }}>
        <Modal trigger={<Button floated='right' className='large ui green button'>Edit</Button>} closeIcon>
          <Modal.Header style={{ fontSize: '2em', textAlign: 'center' }}>
            {this.props.agency.name}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}> Address </h3>
              <Input
                placeholder={this.props.agency.address} label='Street' labelPosition='left'
                size='big' fluid className='padding'
                onChange={this.addressSave.bind(this)} value={this.state.address}
              />
              <Input
                placeholder={this.props.agency.city} label='City' labelPosition='left'
                size='big' className='padding'
                onChange={this.citySave.bind(this)} value={this.state.city}
              />
              <Input
                placeholder={this.props.agency.zipcode} label='Zip Code' labelPosition='left'
                size='big' className='padding'
                onChange={this.zipCode.bind(this)} value={this.state.zipcode}
              />
              <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}> Phone Number </h3>
              <Input
                placeholder={this.props.agency.phone} fluid size='big' label='(XXX) XXX-XXXX'
                labelPosition='left'
                onChange={this.phoneNumber.bind(this)} value={this.state.phone}
              />
              <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}> Contact Information Link </h3>
              <Input
                placeholder={this.props.agency.operation} label='http://' labelPosition='left'
                size='big' fluid className='padding'
                onChange={this.hoursOfOperation.bind(this)} value={this.state.operation}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button className='ui blue button' size='huge' onClick={this.updateAgency.bind(this)}>
              Save Changes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(AgencyDisplay));
