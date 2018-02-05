import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';
import {
  Link,
} from 'react-router-dom';
import logo from './Images/logo.png';
import Client from './Client';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: ""
      },
      agencies: [],
      requestFailed: false
    };
    this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
    this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
  }
  componentDidMount() {
    Client.getRequest('agencies')
      .then((d) => {
        this.setState({
          agencies: d.agencies,
        });
      }, () => {
        this.setState({
          requestFailed: true,
        });
      });
  }

  handleGoogleSuccess(response) {
    this.setState({user: {
        name : response.profileObj.givenName,
        email: response.profileObj.email
      }});
    console.log(response.profileObj);
    console.log(this.state.agencies);
    let emailFound = false;
    let userEmail = this.state.user.email; // temp fix - "this" was undefined in loop below
    let agency = this.state.agencies.find(function(a) {
      a.emails.forEach(function(e) {
        if (e === userEmail && !emailFound) {
          emailFound = true;
        }
      });
      return emailFound;
    });
    console.log(agency);
    // Re-direct page based on agency ID
    //window.location.assign('/agency');
  }

  handleGoogleFailure(response) {
    // TO DO! Handle failure
  }

  render() {
    let login;
    if (!this.state.user.email) {
      login = <GoogleLogin
        className='ui inverted button login-btn'
        clientId="226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com"
        buttonText={<IconText />}
        onSuccess={this.handleGoogleSuccess}
        onFailure={this.handleGoogleFailure}
      />;
    } else {
      login = <h3 className='welcome-msg'>Welcome, {this.state.user.name}!</h3>
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
          {login}
        </div>
      </div>
    );
  }
}

export default Header;

class IconText extends Component {
  render() {
    return (
      <div>
        <Icon name='google' size='large' className='button-text' /> Agency Login
      </div>
    );
  }
}
