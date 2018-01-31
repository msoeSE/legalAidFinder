import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import CategoryModify from './CategoryModify';


class CategoryModal extends Component {
  handleAddEligibility(category, agency, key, comparator, value) {
    //this.props.dispatch(addEligibilityRequest({ category, agency, key, comparator, value }));
  }

  render() {
    // if (!this.props.showModal) {
    //   return null;
    // }

    return (
      <div>
        <Modal open={this.props.showModal}>
          <Modal.Header>{this.props.category.name}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <CategoryModify category={this.props.category}/>
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

export default CategoryModal;