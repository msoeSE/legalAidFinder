import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import { addAdmin } from '../Actions/adminsActions';


function mapStateToProps(state) {
  return { data: state.agencies };
}

class AgencyAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  adminEmail(event) {
    this.setState({ email: event.target.value, msg: '' });
  }
  submitAdmin(event) {
    event.preventDefault();
    const data = {
      email: this.state.email,
    };

    this.props.dispatch(addAdmin(data)).then(() => {
      if (this.props.data.error) {
        const message = this.state.email !== '' ? 'Failed to create admin: ' + this.state.email : 'Failed to create admin.';
        this.setState({ msg: message });
      } else {
        const message = `Successfully created admin: ${this.state.email}`;
        this.setState({ msg: message, email: '' });
      }
    });
  }

  render() {
    return (
      <div>
        <div align='center'>
          <form>
            <Input
              placeholder='example@gmail.com ' label='Enter Gmail Address' labelPosition='left'
              size='big' fluid className='padding'
              onChange={this.adminEmail.bind(this)} value={this.state.email}
            />
            {/* <Dropdown placeholder='Category'  fluid={true} size='big' */}
            {/* className='large text' search selection  options={this.props.data.dropdown} */}
            {/* onChange={this.parentChange.bind(this)} // eslint-disable-next-line */}
            {/* placeholder="Select a parent category" */}
            {/* /> */}
            <Button positive onClick={this.submitAdmin.bind(this)}>Add Admin</Button>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyAdd));
