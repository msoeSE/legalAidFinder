import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import { addAgencies } from '../../actions/agenciesActions';

class AgencyAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      emails: [{ address: '' }],
    };
    this.handleAgencyName = this.handleAgencyName.bind(this);
    this.handleAgencyURL = this.handleAgencyURL.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.handleRemoveEmail = this.handleRemoveEmail.bind(this);
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
  }
  handleAgencyName(event) {
    this.setState({ name: event.target.value });
  }
  handleAgencyURL(event) {
      this.setState({ url: event.target.value });
  }
  handleSubmitAgency(event) {
      event.preventDefault();
      const data = {
        name: this.state.name,
        url: this.state.url,
        emails: this.state.emails
      };

      this.props.dispatch(addAgencies(data));
  }
  handleEmailAddressChange = (idx) => (event) => {
    let copy = this.state.emails.slice();
    let emails = copy.map((email, i) => {
      return (i === idx) ? {...email, address: event.target.value} : email
    })
    this.setState({ emails: emails });
  }
  handleAddEmail(event) {
    event.preventDefault();
    this.setState({
      emails: this.state.emails.concat([{ address: '' }])
    });
  }
  handleRemoveEmail = (idx) => (event) => {
    event.preventDefault();
    this.setState({
      emails: this.state.emails.filter((a, eidx) => idx !== eidx)
    });
  }
  render() {
    return (
      <div>
        <div>
          <form>
            <Input placeholder='Name'
              label='Name '
              labelPosition='left'
              size='big'
              fluid={true}
              className='padding'
              onChange={this.handleAgencyName}
              value={this.state.name}
            />
            <Input placeholder='URL'
              label='URL'
              labelPosition='left'
              size='big'
              fluid={true}
              className='padding'
              onChange={this.handleAgencyURL}
              value={this.state.url}
            />
            {this.state.emails.map((email, idx) => (
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
            <Button positive onClick={this.handleSubmitAgency}>Add Agency</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(AgencyAdd));
