import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class AgencyRequests extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Agency requests would be displayed here</p>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyRequests));
