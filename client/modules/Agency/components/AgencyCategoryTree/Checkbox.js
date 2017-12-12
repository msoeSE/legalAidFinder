import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './AgencyCategoryTree.css';

class Checkbox extends Component {

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    handleCheckboxChange(label);
  };

  render() {

    return (
      <div>
        <label>
          <input
            type="checkbox"
            value={this.props.key}
            checked={this.props.checked}
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
