import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import EligibilityCreator from './EligibilityCreator';


class EligibilityModal extends Component {
  handleAddEligibility(category, agency, key, comparator, value) {
    // this.props.dispatch(addEligibilityRequest({ category, agency, key, comparator, value }));
  }

  render() {
    if (!this.props.showModal || !this.props.eligibility.agency || !this.props.eligibility.category) {
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
              <EligibilityCreator eligibility={{ agency: this.props.eligibility.agency, category: this.props.eligibility.category }} />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default EligibilityModal;
