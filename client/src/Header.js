import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react';
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

function mapStateToProps(state) {
  return { agencyData: state.agencies, user: state.user, adminData: state.admins };
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
    this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchAgencies());
    this.props.dispatch(fetchAdmins());
  }

  handleGoogleSuccess(response) {
    let email = response.profileObj.email;
    let emailFound = false;

    let agency = this.props.agencyData.agencies.find((a) => {
      a.emails.forEach((e) => {
        if (e === email && !emailFound) {
          emailFound = true;
        }
      });
      return emailFound;
    });

    let isAdmin = this.props.adminData.admins.find((a) => {
      if (email === a.email) {
        return true;
      }
    });

    if (agency || isAdmin) {
      this.props.dispatch(setUser(response.profileObj.givenName, response.profileObj.familyName, email, agency, isAdmin));
    }
  }

  handleGoogleFailure(response) {
    // TO DO! Handle failure
  }

  handleLogout(response) {
    this.props.dispatch(clearUser());
  }

  render() {
    let login;
    let logout;
    if (!this.props.user.email) {
      login = <GoogleLogin
        className='ui inverted button login-btn'
        clientId="226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com"
        buttonText={<IconText text="Agency Login" />}
        onSuccess={this.handleGoogleSuccess}
        onFailure={this.handleGoogleFailure}
      />;
    } else {
      logout = <GoogleLogout
        className='ui inverted button logout-btn'
        clientId="226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com"
        buttonText="Logout"
        onSuccess={this.handleLogout}
      >
      </GoogleLogout>
    }
    return (
      <div className='app-header'>
        <div className='header-content'>
          <Link to='/' >
            <h1 className='ui header header-title'>
              <img className='ui image' src={logo} alt='logo' />
              Wisconsin Legal Aid Finder
            </h1>
          </Link>
          { this.props.user.agency ?
            <Button className='ui inverted button' as={Link} to={'agency'}>Agency Home</Button> :
            null
          }
          { this.props.user.admin ?
            <Button className='ui inverted button' as={Link} to={'admin'}>Admin Home</Button> :
            null
          }
          {login}
          {logout}
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
