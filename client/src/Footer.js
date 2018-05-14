import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Button, Modal, Grid } from 'semantic-ui-react';
import { clearUser, setUser } from './Actions/userActions';
import { fetchAdmins } from './Actions/adminsActions';
import { fetchAgencies } from './Actions/agenciesActions';

function mapStateToProps(state) {
  return { agencyData: state.agencies, user: state.user, adminData: state.admins };
}

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      alertTitle: '',
      alertMsg: '',
    };

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    this.alertClose = this.alertClose.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchAgencies());
    this.props.dispatch(fetchAdmins());
  }

  handleLoginSuccess(response) {
    const email = response.profileObj.email;
    let emailFound = false;
    console.log(this.props.user);

    const agency = this.props.agencyData.agencies.find((a) => {
      a.emails.forEach((e) => {
        if (e.toLowerCase() === email.toLowerCase() && !emailFound) {
          emailFound = true;
        }
      });
      return emailFound;
    });

    const isAdmin = this.props.adminData.admins.find((a) => {
      if (email.toLowerCase() === a.email.toLowerCase()) {
        return true;
      }
    });

    if (agency || isAdmin) {
      this.props.dispatch(setUser(response.profileObj.givenName, response.profileObj.familyName, email, agency, isAdmin));
    } else { // No match in DB so log user out
      this.setState({
        showAlert: true,
        alertTitle: 'Login Error',
        alertMsg: 'Email provided does not belong to an Agency or an Admin.',
      });
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut();
      this.props.dispatch(clearUser());
    }
  }

  handleLoginFailure(response) {
    this.setState({
      showAlert: true,
      alertTitle: 'Login Error',
      alertMsg: 'Google was unable to log user in.',
    });
  }

  handleLogoutSuccess(response) {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut();
    this.props.dispatch(clearUser());
  }

  handleLogoutFailure(response) {
    this.props.dispatch(clearUser());
    /* this.setState({
      showAlert: false,
      alertTitle: "Logout Error",
      alertMsg: "Google was unable to log user out."
    }); */
    // Not showing alert because this is how we get around having to choose an account when logging out.
    // This is fine, as even if there is an "error" logging out, we still clear the user and logout anyway. -bw
  }

  alertClose() {
    this.setState({
      showAlert: false,
    });
  }

  render() {
    let login;
    let logout;
    if (!this.props.user.email) {
      login = (<GoogleLogin
        className='loginLogoutButton'
        clientId='226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com'
        buttonText='Agency/Admin Login'
        onSuccess={this.handleLoginSuccess}
        onFailure={this.handleLogoutFailure}
        approvalPrompt='force'
        prompt='consent select_account'
      />);
    } else {
      logout = (<GoogleLogout
        className='loginLogoutButton'
        clientId='226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com'
        buttonText='Logout'
        onSuccess={this.handleLogoutSuccess}
        onFailure={this.handleLogoutFailure}
        prompt='none'
      />);
    }

    return (
      <div>
        <Modal open={this.state.showAlert}>
          <Modal.Header>
            {this.state.alertTitle}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {this.state.alertMsg}
              <Button floated='right' negative onClick={this.alertClose}>
                Ok
              </Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <div>
          <Grid divided stretched stackable columns='equal'>
            <Grid.Row centered>
              <Grid.Column>
                {login}
                {logout}
              </Grid.Column>
              <Grid.Column width={5}>
                  Copyright 2018 - Wisconsin Access to Justice Commission and MSOE
              </Grid.Column>
              <Grid.Column>
                <Button as={Link} className='loginLogoutButton' to={'/agencyrequestform'}>Agency Registration</Button>
              </Grid.Column>
              { this.props.user.admin ?
                <Grid.Column>
                  <Button as={Link} className='loginLogoutButton' to={'/admin'}>Admin Home</Button>
                </Grid.Column> :
                null
              }
              { this.props.user.agency ?
                <Grid.Column>
                  <Button as={Link} className='loginLogoutButton' to={'/agency'}>Agency Home</Button>
                </Grid.Column> :
                null
              }
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Footer);
