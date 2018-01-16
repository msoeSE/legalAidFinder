import React, { Component } from 'react';
import {Header, Image, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types';


class EligibilityModal extends Component {
  state = { open: this.props.showModal };

  show = () => this.setState({ open: true });
  close = () => this.setState({ opn: false });

  // handleAddEligibility = (category, agency, key, comparator, value) => {
  //   this.props.dispatch(addEligibilityRequest({ category, agency, key, comparator, value }));
  // };

  render() {
    this.show();

    return (
      <Modal
        open ={this.state}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

EligibilityModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  // eligibility: PropTypes.shape({
  //   category: PropTypes.string.isRequired,
  //   agency: PropTypes.string.isRequired,
  // }).isRequired,
};

export default EligibilityModal;