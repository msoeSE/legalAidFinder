import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Button } from 'semantic-ui-react';
import MagnifyLoader from '../../Helpers/MagnifyLoader';
import { fetchAgenciesAndDropdown, deleteAgencies } from '../../Actions/agenciesActions';
import {getEligibility} from '../../Reducers/eligibilityReducer';
import AdminDeleteModal from '../AdminDeleteModal';

function mapStateToProps(state) {
  return { data: state.agencies };
}

class AgencyDelete extends Component {
  constructor(props) {
    super(props);
      this.state = {
          id: '',
          name: '',
          msg: '',
          modalOpen: false
      };

      this.toggleModal = this.toggleModal.bind(this);
      this.submitAgency = this.submitAgency.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(fetchAgenciesAndDropdown());
  }
  agencyID(event, data) {
    this.setState({ id: data.value, msg: '' });
    }

    toggleModal(event) {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
        event.preventDefault();
    }

    submitAgency() {
        const data = {
            id: this.state.id
        };

        this.props.dispatch(deleteAgencies(data)).then(() => {
            this.props.dispatch(fetchAgenciesAndDropdown());
            this.setState({msg: 'Successfully deleted agency.', modalOpen: false});
        });
    }
  render() {
    if (!this.props.data.dropdown) {
      return (<MagnifyLoader label="Loading agencies..." />);
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
                onClick={this.toggleModal.bind(this)}>Delete Agency</Button>
            </div>
            <h2>{this.state.msg}</h2>
          </form>
        </div>
          <div>
              <AdminDeleteModal
                  showModal={this.state.modalOpen}
                  onClose={this.toggleModal}
                  deleteMessage="Are you sure you want to delete this agency?"
                  onSubmit={this.submitAgency}
                  agency={this.state.id}
              />
          </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyDelete));
