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
    this.handleAgencyID = this.handleAgencyID.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(fetchAgenciesAndDropdown());
  }
  handleAgencyID(event, data) {
    this.setState({ msg: '' });
    this.setState({ id: data.value });
  }
  handleSubmitAgency(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete it?')) {
      const data = {
        id: this.state.id
      };

      this.props.dispatch(deleteAgencies(data)).then(() => {
        if (!this.props.data.error) {
          // Display success
          this.props.dispatch(fetchAgenciesAndDropdown());
          this.setState({ msg: 'Successfuly deleted agency.' });
        } else {
          // Display error
          this.setState({ msg: 'Failed to delete agency.' });
        }
      });
    }
  }
  render() {
    if (this.props.data.agencies.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    return (
      <div>
        <div>
          <form>
            <Dropdown placeholder='Agency'
              fluid={true} size='big'
              className='padding2'
              search
              selection
              options={this.props.data.dropdown}
              onChange={this.handleAgencyID}
            />
            <div className='padding2'>
              <Button negative type='Submit' value='Submit' className='padding2' onClick={this.handleSubmitAgency}>Delete Agency</Button>
            </div>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyDelete));
