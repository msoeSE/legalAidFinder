import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class AgencyModal extends Component {
  render() {
    if (!this.props.showModal) {
      return null;
    }

    if (!this.props.agency.email) {

    }

    if (!this.props.agency.phone) {

    }

    return (
      <div>
        <Modal trigger={<Button className='small ui blue button'>Click here to learn more about this agency!</Button>} closeIcon>
          <Modal.Header>
            {this.props.agency.name}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <h2> Phone Number: </h2>
              {this.props.agency.phone}
              <h2>Email: </h2>
                {this.props.agency.emails.length > 0 ? this.props.agency.emails.map(email =>
                    <div>{email}</div>) : "There are no emails on file for this agency"}
              <h3> Hours of Operation: </h3>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AgencyModal;
