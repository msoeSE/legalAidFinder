import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import {
  Link,
} from 'react-router-dom';
import logo from './Images/logo.png';
import { fetchAgencies } from "./Actions/agenciesActions";
import { setUser, clearUser } from "./Actions/userActions";

function mapStateToProps(state) {
  return { data: state.agencies, user: state.user };
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
    this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchAgencies());
  }

  handleGoogleSuccess(response) {
    let name = response.profileObj.givenName;
    let email = response.profileObj.email;

    console.log(response.profileObj);
    console.log(this.props.data.agencies);
    let emailFound = false;

    let agency = this.props.data.agencies.find((a) => {
      a.emails.forEach((e) => {
        if (e === email && !emailFound) {
          emailFound = true;
        }
      });
      return emailFound;
    });

    if (agency) {
      this.props.dispatch(setUser(email, agency, false));
    }

    console.log(agency);
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
            <Button as={Link} to={'agency'}>Go to agency page</Button> :
            null
          }
          { this.props.user.admin ?
            <Button as={Link} to={'admin'}>Go to Admin page</Button> :
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
