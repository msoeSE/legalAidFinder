import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import EligibilityCreator from './EligibilityCreator';


class EligibilityModal extends Component {
  // handleAddEligibility = (category, agency, key, comparator, value) => {
  //   this.props.dispatch(addEligibilityRequest({ category, agency, key, comparator, value }));
  // };

  render() {

    if(!this.props.showModal) {
      return null;
    }

    return (
      <Modal open={this.props.showModal}>
        <Modal.Header>Add an eligibility constraint:</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <EligibilityCreator eligibility={{ agency: '5a04f8d1f9c010051c0426ce', category: '5a04d2e3ec140922c08a6717' }} />
            <Button primary onClick={this.props.onClose}>
              Close
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EligibilityModal;
