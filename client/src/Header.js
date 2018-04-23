/**
 * Documentation for the react-google-login npm package: https://www.npmjs.com/package/react-google-login
 */

import React, { Component } from 'react';
import { Icon, Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';
import {
  Link,
} from 'react-router-dom';
import logo from './Images/logo.png';
import { fetchAgencies } from './Actions/agenciesActions';
import { setUser, clearUser } from './Actions/userActions';
import { fetchAdmins } from './Actions/adminsActions';
import './Header.css';

function mapStateToProps(state) {
  return { agencyData: state.agencies, user: state.user, adminData: state.admins };
}

class Header extends Component {
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
        if (e === email && !emailFound) {
          emailFound = true;
        }
      });
      return emailFound;
    });

    const isAdmin = this.props.adminData.admins.find((a) => {
      if (email === a.email) {
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
        className='ui inverted button login-btn'
        clientId='226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com'
        buttonText={<IconText text='Agency/Admin Login' />}
        onSuccess={this.handleLoginSuccess}
        onFailure={this.handleLogoutFailure}
        approvalPrompt='force'
        prompt='consent select_account'
      />);
    } else {
      logout = (<GoogleLogout
        className='ui inverted button logout-btn'
        clientId='226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com'
        buttonText='Logout'
        onSuccess={this.handleLogoutSuccess}
        onFailure={this.handleLogoutFailure}
        prompt='none'
      />);
    }
    return (
      <div className='app-header'>
        <div className='header-content'>
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
          </div>

          <Link to='/' >
            <h1 className='ui header header-title'>
              <img className='ui image' src={logo} alt='logo' />
              Wisconsin's Civil Legal Aid
            </h1>
          </Link>
          {login}
          {logout}
          { this.props.user.admin ?
            <Button className='ui inverted button header-btn' as={Link} to={'/admin'}>Admin Home</Button> :
            null
          }
          { this.props.user.agency ?
            <Button className='ui inverted button header-btn' as={Link} to={'/agency'}>Agency Home</Button> :
            null
          }
          <a href='https://www.wisbar.org/formembers/probono/Pages/Volunteer.aspx'>
            <h3 className='lawyerTab'>
              For Lawyers
            </h3>
          </a>
          <Link to='/workflow'>
            <h3 className='categoryTab'>
              Find Legal Aid
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);

class IconText extends Component {
  render() {
    return (
      <div>
        <Icon name='google' size='large' className='button-text' />{this.props.text}
      </div>
    );
  }
}
