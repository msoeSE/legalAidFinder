import React, { Component } from 'react';
import { Dropdown, Icon, Popup, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setUser } from '../Actions/userActions';

function mapStateToProps(state) {
  return { data: state.agencies, user: state.user };
}

class AgencyDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency: props.agency,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      admin: props.user.admin,
    };
    this.handleAgencyChange = this.handleAgencyChange.bind(this);
  }

  handleAgencyChange = (event, result) =>
    this.props.dispatch(setUser(this.state.firstName, this.state.lastName, this.state.email, result.value, this.state.admin));

  render() {
    return (<div>
      <Form>
        <Dropdown
          placeholder='Switch Agencies'
          selction options={this.props.agencies}
          onChange={this.handleAgencyChange}
        />
        <Popup
          trigger={<Icon className='helpButton' fitted name='question circle' />}
          content='If your email address is associated with more than one agency, then you can switch between agencies with this dropdown!'
          size='small'
          position='right center'
          inverted
        />
      </Form>
    </div>);
  }
}

export default withRouter(connect(mapStateToProps)(AgencyDropdown));
