import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
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
    const { open } = this.state;

    return (
      <div>
        <Modal open={open} onClose={this.close}>
          <Modal.Header>
            Delete Your Account
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>
              No
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

EligibilityModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
};

export default EligibilityModal;