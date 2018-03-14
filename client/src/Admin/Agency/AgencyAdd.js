import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import { addAgencies } from '../../Actions/agenciesActions';

function mapStateToProps(state) {
  return { data: state.agencies };
}

class AgencyAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      emails: [{ address: '' }],
    };
  }
  agencyName(event) {
    this.setState({ name: event.target.value, msg: '' });
  }
  agencyURL(event) {
      this.setState({ url: event.target.value, msg: '' });
  }
  submitAgency(event) {
      event.preventDefault();
      const data = {
        name: this.state.name,
        url: this.state.url,
        emails: this.state.emails,
      };

      this.props.dispatch(addAgencies(data)).then(() => {
        if (!this.props.data.error) {
          let message = 'Successfully created agency: ' + this.state.name;
          this.setState({ msg: message, name: '', url: '', emails: [{ address: '' }] })
        } else {
          let message = this.state.name !== '' ? 'Failed to create agency: ' + this.state.name : 'Failed to create agency.';
          this.setState({ msg: message });
        }
      });
  }
  emailAddressChange = (idx) => (event) => {
    let copy = this.state.emails.slice();
    let emails = copy.map((email, i) => {
      return (i === idx) ? {...email, address: event.target.value} : email
    })
    this.setState({ emails: emails, msg: '' });
  }
  addEmail(event) {
    event.preventDefault();
    this.setState({
      emails: this.state.emails.concat([{ address: '' }]),
      msg: ''
    });
  }
  removeEmail = (idx) => (event) => {
    event.preventDefault();
    this.setState({
      emails: this.state.emails.filter((a, eidx) => idx !== eidx),
      msg: ''
    });
  }
  render() {
    return (
      <div>
        <div>
          <form>
            <Input placeholder='Name' label='Name ' labelPosition='left'
              size='big' fluid={true} className='padding'
              onChange={this.agencyName.bind(this)} value={this.state.name}
            />
            <Input placeholder='URL' label='URL' labelPosition='left'
              size='big' fluid={true} className='padding'
              onChange={this.agencyURL.bind(this)} value={this.state.url}
            />
            {this.state.emails.map((email, idx) => (
              <div key={idx}>
                <Input label='Email' labelPosition='left' size='big'
                  type="text" placeholder={`Email #${idx + 1} address`}
                  value={email.address} className='padding'
                  onChange={this.emailAddressChange(idx).bind(this)}
                />
                <Button negative onClick={this.removeEmail(idx).bind(this)} className="padding" >-</Button>
              </div>
            ))}
            <Button color='blue' onClick={this.addEmail.bind(this)} className='padding'>Add Email</Button>
            <Button positive onClick={this.submitAgency.bind(this)}>Add Agency</Button>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyAdd));
