import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import logo from './Images/logo.png';

import './HeaderAndFooter.css';

function mapStateToProps(state) {
  return { agencyData: state.agencies, user: state.user, adminData: state.admins, headerData: state.header };
}

class Header extends Component {
  render() {
    return (
      <div className='app-header'>
        <div className='header-content'>
          <Link to='/' >
            <h1 className='ui header header-title'>
              <img className='ui image' src={logo} alt='logo' />
              {this.props.headerData.header}
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
