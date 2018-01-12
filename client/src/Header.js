import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import logo from './logo.png';

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
          <Link to='/login'><button className='ui inverted button header-login'>Login</button></Link>
        </div>
      </div>
    );
  }
}

export default Header;

