import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';
import EligibilityGrid from '../Eligibility/EligibilityGrid';

export const NEW_ELIGIBILITY = 'NEW_ELIGIBILITY';
export const VIEW_ELIGIBILITY = 'VIEW_ELIGIBILITY';

class CategoryCheckbox extends Component {
  state = {
    isChecked: this.props.checked,
  };

  toggleCheckboxChange() {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    this.props.handleCheckboxChange(this.props.agencyId, this.props.categoryId, !this.state.isChecked);
  }

  handleButtonClick(type) {
    let x = type;
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
        <EligibilityGrid showGrid={isChecked} count={this.props.eligibility.length} handleClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default CategoryCheckbox;
