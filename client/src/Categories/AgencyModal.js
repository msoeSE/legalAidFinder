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
          <Modal.Header>
            {this.props.agency.name}
            <Button floated='right' negative onClick={this.props.onClose}>
              Cancel
            </Button>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <h2> Phone Number: </h2>
              {this.props.agency.phone}
              <h2>Email: </h2>
              {this.props.agency.emails}
              <h3> Hours of Operation: </h3>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AgencyModal;
