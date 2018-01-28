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
    };
    this.handleAgencyID = this.handleAgencyID.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(fetchAgenciesAndDropdown());
  }
  handleAgencyID(event, data) {
    this.setState({ id: data.value });
  }
  handleSubmitAgency(event) {
    event.preventDefault();
    const data = {
      id: this.state.id,
    };
    this.props.dispatch(deleteAgencies(data));
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
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyDelete));
