import React, { Component } from 'react';
import { Checkbox, Button, Divider } from 'semantic-ui-react';

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

    const num = this.props.eligibility ? this.props.eligibility.key_comparator_value.length : 0;

    if (this.props.depth === 1) {
      return (
        <div style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
          <Divider />
          {`${this.props.depth}) `}<Checkbox
            label={`${this.props.label}`}
            value={this.props.key}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
            style={{ whiteSpace: 'nowrap' }}
          />
          {this.state.isChecked ?
            <Button
              size='mini'
              style={{ marginLeft: '3px' }}
              content={`Edit Eligibility: ${num}`}
              icon='edit'
              labelPosition='right'
              onClick={this.editButtonClicked}
            />
            : null
          }
          <Divider />
        </div>
      );
    } else {
      return (
        <div style={{ whiteSpace: 'nowrap' }}>
          {`${this.props.depth}) `}<Checkbox
            label={`${this.props.label}`}
            value={this.props.key}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
            style={{ whiteSpace: 'nowrap' }}
          />
          {this.state.isChecked ?
            <Button
              size='mini'
              style={{ marginLeft: '3px' }}
              content={`Edit Eligibility: ${num}`}
              icon='edit'
              labelPosition='right'
              onClick={this.editButtonClicked}
            />
            : null
          }
        </div>
      );
    }
  }
}

export default CategoryCheckbox;
