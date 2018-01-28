import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { GoogleLogin } from 'react-google-login-component';
import {
  Link,
} from 'react-router-dom';
import logo from './images/logo.png';

class Header extends Component {
  render() {
    return (
      <div className='app-header'>
        <div className='header-content'>
          <Link to='/' >
            <h1 className='ui header header-title'>
              <img className='ui image' src={logo} alt='logo' />
              Wisconsin Legal Aid Finder
            </h1>
          </Link>
          <Link to='/login'>
              <GoogleLogin socialId="226894844991-9nnlc8m846japmn3u85j4bkk0h4nfd6d.apps.googleusercontent.com"
                     className="ui inverted button header-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText={<IconText />}/>
          </Link>
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
