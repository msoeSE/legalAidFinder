import React, { Component } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';

class CategoryCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: this.props.checked,
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.editButtonClicked = this.editButtonClicked.bind(this);
  }

  toggleCheckboxChange() {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    this.props.handleCheckboxChange(this.props.agencyId, this.props.categoryId, !this.state.isChecked);
  }

  editButtonClicked() {
    this.props.handleEditEligibility(this.props.categoryId);
  }

  render() {
    const { isChecked } = this.state;
    return (
      <div>
        <Checkbox
          label={this.props.label}
          value={this.props.key}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        {this.state.isChecked ?
          <Button size='mini' style={{ marginLeft: '3px' }} content={`Edit Eligibility: ${this.props.eligibility.length}`} icon='edit' labelPosition='right' onClick={this.editButtonClicked} />
          : null
        }
      </div>
    );
  }
}

export default CategoryCheckbox;
