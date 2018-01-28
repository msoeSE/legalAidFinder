import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Input, Button, Loader } from 'semantic-ui-react';
import { fetchAgenciesAndDropdown, modifyAgencies } from '../../actions/agenciesActions';

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
      emailVal: [{ address: '' }],
      msg: ''
    };
    this.handleAgency = this.handleAgency.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.handleRemoveEmail = this.handleRemoveEmail.bind(this);
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
  }
  // Import agencies
  componentWillMount() {
    this.props.dispatch(fetchAgenciesAndDropdown());
  }
  // Map agencies to dropdown, set state of selected agency
  handleAgency(event, data) {
    var agency = this.props.data.agencies.find((e) => {return e._id === data.value});
    this.setState({ urlVal: agency.url, nameVal: agency.name, idVal: agency._id, msg: '' });
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
      this.setState({ nameVal: event.target.value, msg: '' });
    else
      this.setState({ urlVal: event.target.value, msg: '' });
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

    this.props.dispatch(modifyAgencies(data)).then(() => {
        if (!this.props.data.error) {
          // Display success
          this.props.dispatch(fetchAgenciesAndDropdown());
          let message = 'Successfully edited agency: ' + this.state.nameVal;
          this.setState({ msg: message });
        } else {
          // Display error
          let message = 'Failed to edit agency.';
          this.setState({ msg: message });
        }
    });
  }
  handleEmailAddressChange = (idx) => (event) => {
    let copy = this.state.emailVal.slice();
    let emails = copy.map((email, i) => {
      return (i === idx) ? {...emails, address: event.target.value} : email
    })
    this.setState({ emailVal: emails, msg: '' });
  }
  handleAddEmail(event) {
    event.preventDefault();
    this.setState({
      emailVal: this.state.emailVal.concat(['']),
      msg: ''
    });
  }
  handleRemoveEmail = (idx) => (event) => {
    event.preventDefault();
    this.setState({
      emailVal: this.state.emailVal.filter((a, eidx) => idx !== eidx),
      msg: ''
    });
  }
  render() {
    if (this.props.data.agencies.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    return (
      <div>
        <div>
          <form>
            <Dropdown placeholder='Select an Agency to edit'
              fluid
              className='padding'
              search selection
              options={this.props.data.dropdown}
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
              <div key={idx}>
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
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyModify));
