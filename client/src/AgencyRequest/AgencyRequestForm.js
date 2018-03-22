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
          <h1>Agency Request Form</h1>
          <div className="field">
            <label>Name</label>
            <input type="text" name="agency-name" placeholder="Name"/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="agency-email" placeholder="Email"/>
          </div>
          <div className="field">
            <label>URL</label>
            <input type="text" name="agency-url" placeholder="URL"/>
          </div>
        </form>
        <button className="ui button" onClick={this.processRequests}>Submit</button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyRequestForm));
