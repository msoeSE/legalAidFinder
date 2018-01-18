import React, { Component } from 'react';
import { Dropdown, Input, Button } from 'semantic-ui-react';
import Client from '../../Client';

class AgencyModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown_agencies: '', // Agencies formatted for dropdown
      full_agencies: '',
      nameVal: '',
      urlVal: '',
      idVal: '',
      emailVal: [{ address: '' }],
    };
    this.handleAgency = this.handleAgency.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.handleRemoveEmail = this.handleRemoveEmail.bind(this);
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
  }
  // Import agencies
  componentDidMount() {
    Client.getAgencies()
      .then((d) => {
        this.setState({
          dropdown_agencies: d.agencies.map((a) => {return {key: a._id, value: a._id, text: a.name}}),
          full_agencies: d.agencies
        });
      }, () => {
        this.setState({
          requestFailed: true,
        });
      });
  }
  // Map agencies to dropdown, set state of selected agency
  handleAgency(event, data) {
    var agency = this.state.full_agencies.find((e) => {return e._id === data.value});
    this.setState({ urlVal: agency.url, nameVal: agency.name, idVal: agency._id });
    var array = [];
    agency.emails.forEach((e) => {
      if (e !== null)
        array.push({ address: e });
    });
    this.setState({ emailVal: array });
  }
  // Update agency name and value
  handleInput(event, data) {
    if (data.placeholder === 'Name')
      this.setState({ nameVal: event.target.value });
    else
      this.setState({ urlVal: event.target.value });
  }
  // PUT request on submit
  handleSubmitAgency(event) {
    event.preventDefault();
    const data = {
      name: this.state.nameVal,
      url: this.state.urlVal,
      query: { _id : this.state.idVal },
      emails: this.state.emailVal
    };

    Client.modifyAgencies(data)
      .then((d) => {
        console.log(d);
      });
  }
  handleEmailAddressChange = (idx) => (event) => {
    let copy = this.state.emailVal.slice();
    let emails = copy.map((email, i) => {
      return (i === idx) ? {...emails, address: event.target.value} : email
    })
    this.setState({ emailVal: emails });
  }
  handleAddEmail(event) {
    event.preventDefault();
    this.setState({
      emailVal: this.state.emailVal.concat([''])
    });
  }
  handleRemoveEmail = (idx) => (event) => {
    event.preventDefault();
    this.setState({
      emailVal: this.state.emailVal.filter((a, eidx) => idx !== eidx)
    });
  }
  render() {
    if (!this.state.dropdown_agencies) {
      return (<div className='ui segment'>
        <p>Loading</p>
        <div className='ui active dimmer'>
          <div className='ui loader' />
        </div>
      </div>);
    }
    return (
      <div>
        <div>
          <form>
            <Dropdown placeholder='Select an Agency to edit' 
              fluid
              className='padding'
              search selection 
              options={this.state.dropdown_agencies} 
              onChange={this.handleAgency} />
            <Input placeholder='Name'
              label='Name'
              labelPosition='left'
              size='big'
              fluid={true}
              className='padding'
              value={this.state.nameVal}
              onChange={this.handleInput} />
            <Input placeholder='URL' 
              label='URL'
              labelPosition='left'
              size='big'
              fluid={true}
              className='padding'
              value={this.state.urlVal} 
              onChange={this.handleInput} />
            {this.state.emailVal.map((email, idx) => (
              <div key={Math.random(99999999)*(new Date().getMilliseconds())}>
                <Input
                  label='Email'
                  labelPosition='left'
                  size='big'
                  type="text"
                  placeholder={`Email #${idx + 1} address`}
                  value={email.address}
                  className='padding'
                  onChange={this.handleEmailAddressChange(idx)}
                />
                <Button negative onClick={this.handleRemoveEmail(idx)} className="padding" >-</Button>
              </div>
            ))}
            <Button color='blue' onClick={this.handleAddEmail} className='padding'>Add Email</Button>
            <Button positive onClick={this.handleSubmitAgency}>Edit Agency</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default AgencyModify;