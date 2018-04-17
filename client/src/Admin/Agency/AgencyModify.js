import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Input, Button, Divider } from 'semantic-ui-react';
import MagnifyLoader from '../../Helpers/MagnifyLoader';
import { fetchAgenciesAndDropdown, modifyAgencies } from '../../Actions/agenciesActions';

function mapStateToProps(state) {
  return { data: state.agencies };
}

class AgencyModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVal: '',
      urlVal: '',
      idVal: '',
      emailVal: [ { address: '', name: '' } ],
      msg: '',
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchAgenciesAndDropdown());
  }
  handleAgency(event, data) {
    const agency = this.props.data.agencies.find(e => e._id === data.value);
    this.setState({ urlVal: agency.url, nameVal: agency.name, idVal: agency._id, msg: '' });
    const array = [];
    agency.emails.forEach((e) => {
      if (e !== null) { array.push({ address: e }); }
    });
    this.setState({ emailVal: array });
  }
  handleInput(event, data) {
    if (data.placeholder === 'Name') { this.setState({ nameVal: event.target.value, msg: '' }); } else { this.setState({ urlVal: event.target.value, msg: '' }); }
  }
  handleSubmitAgency(event) {
    event.preventDefault();
    const data = {
      name: this.state.nameVal,
      url: this.state.urlVal,
      query: { _id: this.state.idVal },
      emails: this.state.emailVal,
    };

    this.props.dispatch(modifyAgencies(data)).then(() => {
      this.props.dispatch(fetchAgenciesAndDropdown());
      const message = `Successfully edited agency: ${this.state.nameVal}`;
      this.setState({ msg: message });
        // if (!this.props.data.error) {
        //   this.props.dispatch(fetchAgenciesAndDropdown());
        //   let message = 'Successfully edited agency: ' + this.state.nameVal;
        //   this.setState({ msg: message });
        // } else {
        //   let message = 'Failed to edit agency.';
        //   this.setState({ msg: message });
        // }
    });
  }
  handleEmailAddressChange = idx => (event) => {
    const copy = this.state.emailVal.slice();
    const emails = copy.map((email, i) => (i === idx) ? { ...emails, address: event.target.value, name: '' } : email);
    this.setState({ emailVal: emails, msg: '' });
  }
  handleAddEmail(event) {
    event.preventDefault();
    this.setState({
      emailVal: this.state.emailVal.concat([ { address: '' } ]),
      msg: '',
    });
  }
  handleRemoveEmail = idx => (event) => {
    event.preventDefault();
    this.setState({
      emailVal: this.state.emailVal.filter((a, eidx) => idx !== eidx),
      msg: '',
    });
  }
  render() {
    if (!this.props.data.dropdown) {
      return (<MagnifyLoader label='Loading agencies...' />);
    }

    return (
      <div>
        <div>
          <form>
            <Dropdown
              placeholder='Select an Agency to edit' fluid
              className='padding' search selection
              options={this.props.data.dropdown}
              onChange={this.handleAgency.bind(this)}
            />
            <Input
              placeholder='Name' label='Name' labelPosition='left'
              size='big' fluid className='padding'
              value={this.state.nameVal}
              onChange={this.handleInput.bind(this)}
            />
            <Input
              placeholder='URL' label='URL' labelPosition='left'
              size='big' fluid className='padding'
              value={this.state.urlVal}
              onChange={this.handleInput.bind(this)}
            />
            {this.state.emailVal.map((email, idx) => (
              <div key={idx}>
                <Input
                  label='Email' labelPosition='left' size='big' type='text'
                  placeholder={`Email #${idx + 1} address`} value={email.address}
                  className='padding' onChange={this.handleEmailAddressChange(idx).bind(this)}
                />
                <Button negative onClick={this.handleRemoveEmail(idx).bind(this)} className='padding' >-</Button>
              </div>
            ))}
            <Button color='blue' onClick={this.handleAddEmail.bind(this)} className='padding'>Add Email</Button>
            <Divider />
            <Button positive onClick={this.handleSubmitAgency.bind(this)}>Submit Agency Changes</Button>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyModify));
