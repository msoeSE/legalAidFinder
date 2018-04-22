import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { addAgencyRequests, deleteAgencyRequests } from '../Actions/agencyRequestsActions'

function mapStateToProps(state) {
  return { data: state.requests };
}

class AgencyRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agency_name: '',
      agency_email: '',
      agency_url: '',
      contact_name: '',
      contact_phone: '',
      contact_email: '',
      comments: '',
    };

    this.submitAgencyRequest = this.submitAgencyRequest.bind(this);
  }

  agencyName(event) {
    this.setState({ agency_name: event.target.value });
  }

  agencyEmail(event) {
    this.setState({ agency_email: event.target.value });
  }

  agencyUrl(event) {
    this.setState({ agency_url: event.target.value });
  }

  contactName(event) {
    this.setState({ contact_name: event.target.value });
  }

  contactPhone(event) {
    this.setState({ contact_phone: event.target.value });
  }

  contactEmail(event) {
    this.setState({ contact_email: event.target.value });
  }

  comments(event) {
    this.setState({ comments: event.target.value });
  }

  submitAgencyRequest(event) {
    event.preventDefault();
    const data = {
      agency_name: this.state.agency_name,
      agency_email: this.state.agency_email,
      agency_url: this.state.agency_url,
      contact_name: this.state.contact_name,
      contact_phone: this.state.contact_phone,
      contact_email: this.state.contact_email,
      comments: this.state.comments,
    };

    this.props.dispatch(addAgencyRequests(data)).then(() => {
      console.log("Successfully added Agency Request");
      console.log(data);
      this.setState({ agency_name: '', agency_email: '', agency_url: '',
                      contact_name: '', contact_phone: '', contact_email: '',
                      comments: '' });
    });
  }

  render() {
    return (
      <div>
        <form className="ui form">
          <h1>Agency Registration</h1>
          <p>Paragraph here with instructions</p>
          <h3>Agency Information:</h3>
          <div className="field">
            <label>Name</label>
            <input type="text" name="agency-name" placeholder=""
                   onChange={this.agencyName.bind(this)} value={this.state.agency_name}/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="agency-email" placeholder=""
                   onChange={this.agencyEmail.bind(this)} value={this.state.agency_email}/>
          </div>
          <div className="field">
            <label>URL</label>
            <input type="text" name="agency-url" placeholder=""
                   onChange={this.agencyUrl.bind(this)} value={this.state.agency_url}/>
          </div>
          <h3>Contact Person Information:</h3>
          <div className="field">
            <label>Name</label>
            <input type="text" name="contact-name" placeholder=""
                   onChange={this.contactName.bind(this)} value={this.state.contact_name}/>
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input type="text" name="contact-phone" placeholder=""
                   onChange={this.contactPhone.bind(this)} value={this.state.contact_phone}/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="contact-email" placeholder=""
                   onChange={this.contactEmail.bind(this)} value={this.state.contact_email}/>
          </div>
          <h3>Additional Comments:</h3>
          <div className="field">
            <input type="text" name="comments" placeholder="Comments"
                   onChange={this.comments.bind(this)} value={this.state.comments}/>
          </div>
        </form>
        <button className="ui button" onClick={this.submitAgencyRequest}>Submit</button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyRequestForm));
