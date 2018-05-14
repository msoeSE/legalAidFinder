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
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import logo from './Images/logo.png';
import { fetchAgencies } from './Actions/agenciesActions';
import { setUser, clearUser } from './Actions/userActions';
import { fetchAdmins } from './Actions/adminsActions';
import './HeaderAndFooter.css';

function mapStateToProps(state) {
  return { agencyData: state.agencies, user: state.user, adminData: state.admins };
}

class Header extends Component {
  render() {
    return (
      <div className='app-header'>
        <div className='header-content'>
          <Link to='/' >
            <h1 className='ui header header-title'>
              <img className='ui image' src={logo} alt='logo' />
              Wisconsin's Civil Legal Aid
            </h1>
          </Link>
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
