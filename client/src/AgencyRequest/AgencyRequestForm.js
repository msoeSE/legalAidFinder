import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { addAgencyRequests } from '../Actions/agencyRequestsActions';

function mapStateToProps(state) {
  return { };
}

class AgencyRequestForm extends Component {
  constructor(props) {
    super(props);

    this.processRequests = this.processRequests.bind(this);
  }

  processRequests() {
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
            <input type="text" name="agency-name" placeholder=""/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="agency-email" placeholder=""/>
          </div>
          <div className="field">
            <label>URL</label>
            <input type="text" name="agency-url" placeholder=""/>
          </div>
          <h3>Contact Person Information:</h3>
          <div className="field">
            <label>Name</label>
            <input type="text" name="contact-name" placeholder=""/>
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input type="text" name="contact-phone" placeholder=""/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="contact-email" placeholder=""/>
          </div>
          <h3>Additional Comments:</h3>
          <div className="field">
            <input type="text" name="comments" placeholder="Comments"/>
          </div>
        </form>
        <button className="ui button" onClick={this.processRequests}>Submit</button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyRequestForm));
