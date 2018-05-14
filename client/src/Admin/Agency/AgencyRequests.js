import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAgencyRequests, deleteAgencyRequests, addAgencyRequests } from '../../Actions/agencyRequestsActions';
import { addAgencies } from '../../Actions/agenciesActions';
import $ from 'jquery';

function mapStateToProps(state) {
  return { requests: state.agencyRequests.requests };
}

class AgencyRequests extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showAlert: false,
      alertTitle: "",
      alertMsg: ""
    };

    this.acceptAgencyRequest = this.acceptAgencyRequest.bind(this);
    this.rejectAgencyRequest = this.rejectAgencyRequest.bind(this);
    this.alertClose = this.alertClose.bind(this);
  }

  componentWillMount () {
    this.props.dispatch(fetchAgencyRequests());
  }

  // Add agency to Agency table and update in Agency Request table
  acceptAgencyRequest(req) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; // January is 0
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;
    // Add agency to Agency table
    var data = {
      name: req.agency_name,
      url: req.agency_url,
      emails: [{ address: req.agency_email}],
      agency_name: req.agency_name,
      agency_email: req.agency_email,
      agency_url: req.agency_url,
      contact_name: req.contact_name,
      contact_phone: req.contact_phone,
      contact_email: req.contact_email,
      comments: req.comments,
      request_status: 1,
      date_submitted: req.date_submitted,
      date_accepted: today.toString(),
    };

    const deleteData = {
      id: req._id,
    };

    this.props.dispatch(addAgencies(data)).then(() => {
      this.props.dispatch(deleteAgencyRequests(deleteData)). then(() => {
        this.props.dispatch(addAgencyRequests(data)).then(() => {
          this.setState({
            showAlert: true,
            alertTitle: "Agency Accepted",
            alertMsg: req.agency_name + " has been added as an agency. Please let " + req.contact_name + " know at " +
            req.contact_phone + " or " + req.contact_email + ".",
          });
        });

        // Send email to administrator
        const email = {
          service_id: 'gmail',
          template_id: 'agency_request_accepted',
          user_id: 'user_p9e1W3DpCdsaN9gReADlT',
          template_params: {
            'message_html': '<div><table>'
            + '<tr><td><b>Agency Name</b></td><td>' + data.agency_name + '</td></tr>'
            + '<tr><td><b>Agency Email</b></td><td>' + data.agency_email + '</td></tr>'
            + '<tr><td><b>Agency URL</b></td><td>' + data.agency_url + '</td></tr>'
            + '<tr><td><b>Contact Name</b></td><td>' + data.contact_name + '</td></tr>'
            + '<tr><td><b>Contact Phone</b></td><td>' + data.contact_phone + '</td></tr>'
            + '<tr><td><b>Contact Email</b></td><td>' + data.contact_email + '</td></tr>'
            + '<tr><td><b>Comments</b></td><td>' + data.comments + '</td></tr>'
            + '</table></div>',
              'agency_name' : '<b>' + req.agency_name + '</b>'
          }
        };
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
          type: 'POST',
          data: JSON.stringify(email),
          contentType: 'application/json'
        });
      });
    });
  }

  rejectAgencyRequest(req) {
    const data = {
      id: req._id,
    };

    this.props.dispatch(deleteAgencyRequests(data)).then(() => {
      this.setState({
        showAlert: true,
        alertTitle: "Agency Rejected",
        alertMsg: "The request for " + req.agency_name + " has been deleted.",
      });
    });
  }

  alertClose() {
    this.setState({
      showAlert: false
    });

    this.props.dispatch(fetchAgencyRequests());
  }

  render () {
    if (this.props.requests.length > 0) {
      var requests = [];
      for (var i = 0; i < this.props.requests.length; i++) {
        var req = this.props.requests[i];
        var action;
        if (req.request_status === 1) {
          action = "Accepted on " + req.date_accepted;
        } else {
          action = <div className="ui buttons">
            <button className="ui positive button" onClick={() => this.acceptAgencyRequest(req)}>Accept</button>
            <div className="or"/>
            <button className="ui negative button" onClick={() => this.rejectAgencyRequest(req)}>Reject</button>
          </div>;
        }
        requests.push(
          <tr key={req._id}>
            <td>{req.date_submitted}</td>
            <td>Name: {req.agency_name}<br/>
              Email: {req.agency_email}<br/>
              URL: {req.agency_url}</td>
            <td>Name: {req.contact_name}<br/>
              Email: {req.contact_email}<br/>
              Phone: {req.contact_phone}</td>
            <td>{req.comments}</td>
            <td>
              {action}
            </td>
          </tr>
        );
      }
      return (
        <div>
          <div>
            <Modal open={this.state.showAlert}>
              <Modal.Header>
                {this.state.alertTitle}
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  {this.state.alertMsg}
                  <Button floated='right' positive onClick={this.alertClose}>
                    Ok
                  </Button>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>

          <table className="ui celled table">
            <thead>
            <tr>
              <th>Date Submitted</th>
              <th>Agency</th>
              <th>Contact Person</th>
              <th>Comments</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
              {requests}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div>No requests to display</div>;
    }
  }
}

export default withRouter(connect(mapStateToProps)(AgencyRequests));
