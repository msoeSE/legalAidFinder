import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';

class AgencyModal extends Component {
  render() {
    if (!this.props.showModal) {
      return null;
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
              <div>
                {this.props.agency.phone > 0 ? <div className='phoneNum'>{this.props.agency.phone} </div> : <div className='noPhone'>There is not a phone number on file for this agency</div>}
              </div>
              <h2>Email/s: </h2>
              {this.props.agency.emails.length > 0 ? this.props.agency.emails.map(email =>
                <div>{email}</div>) : <div className='noPhone'> There are no emails on file for this agency </div>}
              <h3> Hours of Operation: </h3>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button className='ui blue button' href={this.props.agency.url}>
              Visit Website
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AgencyModal;
