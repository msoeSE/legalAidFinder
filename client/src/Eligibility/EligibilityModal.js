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
          <Button floated='right' style={{ marginTop: '5px', marginRight: '6px' }} negative onClick={this.props.onClose}>
            Cancel
          </Button>
          <Modal.Header>
            <h2>Add Eligibility Criteria:</h2>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <EligibilityCreator onSubmitted={this.props.onClose} agencyId={this.props.agency} categoryId={this.props.category} kcvList={this.props.eligibility ? this.props.eligibility.key_comparator_value : []} />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default EligibilityModal;
