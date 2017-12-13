import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './AgencyCategoryTree.css';

class Checkbox extends Component {
  state = {
    isChecked: this.props.checked,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  };

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;
    return (
      <div>
        <label>
          <input
            type="checkbox"
            value={this.props.key}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          {'\t' + this.props.label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

export default Checkbox;
