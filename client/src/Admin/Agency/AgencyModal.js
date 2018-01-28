import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class AgencyModal extends Component {
  render() {
    if (!this.props.showModal) {
      return null;
    }

    return (
      <div>
        <Modal open={this.props.showModal}>
          <Modal.Header>Add an Agency constraint:</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Button primary onClick={this.props.onClose}>
                Close
              </Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AgencyModal;