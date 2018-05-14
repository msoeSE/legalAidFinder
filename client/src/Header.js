import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import logo from './Images/logo.png';

import './HeaderAndFooter.css';
import {fetchHeader} from "./Actions/headerActions";

function mapStateToProps(state) {
  return { headerData: state.header };
}

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            header: '',
        };
    }

    componentWillMount(){
      this.props.dispatch(fetchHeader());
    }

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
