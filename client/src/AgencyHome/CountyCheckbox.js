import React, { Component } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';

class CountyCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: this.props.checked,
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    this.props.handleCheckboxChange(this.props.agencyId, this.props.county.name, !this.state.isChecked);
  }

  render() {
    const { isChecked } = this.state;

    return (
      <div>
        <Checkbox
          label={this.props.county.name}
          value={this.props.county.name}
          key={this.props.county.name}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
      </div>
    );
  }
}

export default CountyCheckbox;
