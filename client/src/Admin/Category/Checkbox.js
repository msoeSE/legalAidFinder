import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

// Import Style

class Checkbox extends Component {
  state = {
    isChecked: this.props.checked,
  };

  toggleCheckboxChange = () => {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    this.props.handleCheckboxChange(this.props.agencyId, this.props.categoryId, !this.state.isChecked);
  };

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;
    return (
      <div>
        <label>
          <input
            type='checkbox'
            value={this.props.key}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          {`\t${this.props.label}`}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  // agencyId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};

export default Checkbox;