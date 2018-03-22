import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAgencyRequests } from '../../Actions/agencyRequestsActions';

function mapStateToProps(state) {
  return { requests: state.agencyRequests.requests };
}

class AgencyRequests extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchAgencyRequests());
  }

  render() {
    console.log(this.props);
    if (this.props.requests.length > 0){
      return (
        <div>
          <p>Agency requests would be displayed here</p>
          <button onClick={this.clicked}>Click</button>
          <p>{this.props.requests[0].email}</p>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default connect(mapStateToProps)(AgencyRequests);
