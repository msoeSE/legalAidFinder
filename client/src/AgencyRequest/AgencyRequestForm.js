import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

function mapStateToProps(state) {
  return { };
}

class AgencyRequestForm extends Component {
  constructor(props) {
    super(props);
  }

  processRequests() {

  }

  render() {
    return (
      <form className="ui form">
        <div className="field">
          <label>Agency Name</label>
          <input type="text" name="agency-name" placeholder="Agency Name"/>
        </div>
        <div className="field">
          <label>Agency Email</label>
          <input type="text" name="agency-email" placeholder="Agency Email"/>
        </div>
        <button className="ui button" type="submit" onClick={this.processRequests}>Submit</button>
      </form>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyRequestForm));
