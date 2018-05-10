import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'semantic-ui-react';
import { fetchAdminsAndDropdown, deleteAdmin } from '../Actions/adminsActions';

function mapStateToProps(state) {
  return { data: state.admins };
}

class AgencyAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }
  adminID(data) {
    this.setState({ id: data.value, msg: '' });
  }

  componentWillMount() {
    this.props.dispatch(fetchAdminsAndDropdown());
  }
  deleteAdmins(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to delete it?')) {
      const data = {
        id: this.state.id,
      };

      this.props.dispatch(deleteAdmin(data)).then(() => {
        //this.props.dispatch(fetchAdminsAndDropdown());
        //this.setState({ msg: 'Successfuly deleted admin.' });
        if (!this.props.data.error) {
          this.props.dispatch(fetchAdminsAndDropdown());
          this.setState({ msg: 'Successfuly deleted admin.' });
        } else {
          this.setState({ msg: 'Failed to delete admin.' });
        }
      });
    } else {
      this.setState({ msg: '' });
    }
  }

  render() {
    return (
      <div>
        <div align='center'>
          <form>
            <Dropdown placeholder='Select an Admin to delete'
                      fluid={true} size='big' className='padding2' search selection
                      options={this.props.data.dropdown} onChange={this.adminID.bind(this)}
            />
            <Button negative onClick={this.deleteAdmins.bind(this)}>Delete Admin</Button>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyAdd));
