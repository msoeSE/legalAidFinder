import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import CategoryCreator from './CategoryCreator';


class CategoryModal extends Component {
  handleAddEligibility(category, agency, key, comparator, value) {
    //this.props.dispatch(addEligibilityRequest({ category, agency, key, comparator, value }));
  }

  render() {
    if (!this.props.showModal || !this.props.eligibility.agency || !this.props.eligibility.category) {
      return null;
    }

    return (
      <div>
        <Modal open={this.props.showModal}>
          <Modal.Header>Add an eligibility constraint:</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <CategoryCreator eligibility={{ agency: this.props.eligibility.agency, category: this.props.eligibility.category }} />
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