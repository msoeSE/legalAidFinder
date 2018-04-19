import React, { Component } from 'react';
import { Button, Modal, Icon, Card, Container } from 'semantic-ui-react';

class AgencyModal extends Component {
  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <Container fluid style={{ padding: '0.5em' }} >
        <Modal
          trigger={
            <Card fluid>
              <Card.Content>
                <Card.Header>{this.props.agency.name}</Card.Header>
                <Card.Meta>
                  Click to learn more about this agency!
                </Card.Meta>
              </Card.Content>
            </Card>
          } closeIcon
        >
          <Modal.Header style={{ fontSize: '2em', textAlign: 'center' }}>
            Contact Information for {this.props.agency.name}
          </Modal.Header>
          <Modal.Content style={{ textAlign: 'center' }}>
            <Modal.Description>
              <h2 style={{ textDecoration: 'underline' }}>Phone Number: </h2>
              <div>
                {this.props.agency.phone ? <div className='phoneNum'>{this.props.agency.phone} </div> :
                <div className='noPhone'>There is not a phone number on file for this agency!</div>}
              </div>
              <h2 style={{ textDecoration: 'underline' }}>Address: </h2>
              {this.props.agency.address ? <div className='phoneNum'>{`${this.props.agency.address}\n` + `${this.props.agency.city}` + `, WI, ${this.props.agency.zipcode}`} </div> :
              <div className='noPhone'>There is currently no address on file for this agency!</div>}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {this.props.agency.operation ?
              <Button className='ui green button' href={`http://${this.props.agency.operation}`}>
              Hours of Operation
            </Button> :
              <Button disabled>
                Hours of Operation
              </Button>}
            {this.props.agency.url ?
              <Button className='ui blue button' href={this.props.agency.url}>
                Visit Website
              </Button> :
              <Button disabled>
                Visit Website
              </Button>}
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

export default AgencyModal;
