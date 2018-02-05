import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Button, Loader } from 'semantic-ui-react';
import { fetchAgenciesAndDropdown, deleteAgencies } from '../../actions/agenciesActions';

function mapStateToProps(state) {
  return { data: state.agencies };
}

class AgencyDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      msg: ''
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchAgenciesAndDropdown());
  }
  agencyID(event, data) {
    this.setState({ id: data.value, msg: '' });
  }
  submitAgency(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to delete it?')) {
      const data = {
        id: this.state.id
      };

      this.props.dispatch(deleteAgencies(data)).then(() => {
        if (!this.props.data.error) {
          this.props.dispatch(fetchAgenciesAndDropdown());
          this.setState({ msg: 'Successfuly deleted agency.' });
        } else {
          this.setState({ msg: 'Failed to delete agency.' });
        }
      });
    } else {
      this.setState({ msg: '' });
    }
  }
  render() {
    if (this.props.data.agencies.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    return (
      <div>
        <div align="center">
          <form>
            <Dropdown placeholder='Select an Agency to delete'
              fluid={true} size='big' className='padding2' search selection 
              options={this.props.data.dropdown} onChange={this.agencyID.bind(this)}
            />
            <div className='padding2'>
              <Button negative type='Submit' value='Submit' className='padding2' 
                onClick={this.submitAgency.bind(this)}>Delete Agency</Button>
            </div>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyDelete));
