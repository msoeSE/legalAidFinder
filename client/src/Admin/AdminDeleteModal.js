import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class AdminDeleteModal extends Component {

    render() {
        if (!this.props.showModal) {
            return null;
        }

        return (
            <div>
                <Modal open={this.props.showModal}>
                    <Button floated='right' style={{ marginTop: '5px', marginRight: '6px' }} negative onClick={this.props.onClose}>
                        X
                    </Button>
                    <Modal.Header>
                        <h2>{this.props.deleteMessage}</h2>
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <div className="ui buttons" style={{marginLeft: "25%", width: "50%"}}>
                                <button className="ui positive button" onClick={this.props.onSubmit}>Yes</button>
                                <div className="or"/>
                                <button className="ui negative button" onClick={this.props.onClose}>No</button>
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default AdminDeleteModal;
