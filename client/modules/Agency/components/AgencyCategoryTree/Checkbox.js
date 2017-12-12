import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  /*state = {
    isChecked: false,
  }*/

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    /*this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));*/

    handleCheckboxChange(label);
  }

  render() {

    return (
      <div className="checkbox">
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