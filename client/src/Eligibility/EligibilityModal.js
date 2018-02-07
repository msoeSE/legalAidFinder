import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import EligibilityCreator from './EligibilityCreator';

class EligibilityModal extends Component {
  render() {
    if (!this.props.showModal || !this.props.agency || !this.props.category) {
      return null;
    }

    return (
      <div>
        <Modal open={this.props.showModal}>
          <Modal.Header>
            Add an eligibility constraint:
            <Button floated='right' negative onClick={this.props.onClose}>
              Cancel
            </Button>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <EligibilityCreator onSubmitted={this.props.onClose} agencyId={this.props.agency} categoryId={this.props.category} eligibilities={this.props.eligibilities} />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default EligibilityModal;
