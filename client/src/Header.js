import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Client from './Client';
import GoogleLogin from 'react-google-login';
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
  }

  componentWillMount() {
    this.props.dispatch(fetchAgencies());
    this.props.dispatch(fetchAdmins());
  }

  handleGoogleSuccess(response) {
    let name = response.profileObj.givenName;
    let email = response.profileObj.email;

    console.log(response.profileObj);
    console.log(this.props.agencyData.agencies);
    console.log(this.props.adminData.admins);
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
      this.props.dispatch(setUser(email, agency, isAdmin));
    }

  }

  handleGoogleFailure(response) {
    // TO DO! Handle failure
  }

  render() {
    let login;
    if (!this.props.user.email) {
      login = <GoogleLogin
        className='ui inverted button login-btn'
        clientId="226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com"
        buttonText={<IconText />}
        onSuccess={this.handleGoogleSuccess}
        onFailure={this.handleGoogleFailure}
      />;
    } else {
      login = <h3 className='welcome-msg'>Welcome, {this.props.user.agency.name}!</h3>;
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
          { this.props.user.email ?
            <Button as={Link} to={'agency'}>Agency Home</Button> :
            null
          }
          { this.props.user.admin ?
            <Button as={Link} to={'admin'}>Admin Home</Button> :
            null
          }
          {login}
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
        <Icon name='google' size='large' className='button-text' /> Agency Login
      </div>
    );
  }
}
