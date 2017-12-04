import React from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './EligibilityCreator.css';

class EligibilityCreator extends React.Component {
  constructor() {
    super();
    this.state = { keyValue: 'Income (% of FPL)', comparatorValue: '<' };
  }

  handleKeyChange = (e) => {
    this.state.keyValue = e.target.value;
  };

  handleComparatorChange = (e) => {
    this.state.comparatorValue = e.target.value;
  };

  addEligibility = () => {
    const valueRef = this.refs.value;
    alert(`${this.state.keyValue} ${this.state.comparatorValue} ${valueRef.value}`);
    if (this.state.keyValue && this.state.comparatorValue && valueRef.value) {
      this.props.addEligibility(this.state.keyValue, this.state.comparatorValue, valueRef.value);
      this.state.keyValue = this.state.comparatorValue = valueRef.value = '';
    }
  };

  render() {
    return (
      <div>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Create new eligibility criteria:</h2>
          <select name="key" className={styles['form-field']} onChange={this.handleKeyChange} >
            <option value="Income (% of FPL)">Income (% of FPL)</option>
            <option value="Age">Age</option>
            <option value="Disability">Disability</option>
            <option value="Veteran">Veteran</option>
          </select>
          <select name="comparator" className={styles['form-field']} onChange={this.handleComparatorChange}>
            <option value="<">&lt;</option>
            <option value="≤">≤</option>
            <option value=">">&gt;</option>
            <option value="≥">≥</option>
            <option value="=">=</option>
          </select>
          <input placeholder="Value" className={styles['form-field']} ref="value" />
          <button className={styles['eligibility-submit-button']} onClick={this.addEligibility}>Submit</button>
        </div>
      </div>
    );
  }
}

EligibilityCreator.propTypes = {
  addEligibility: PropTypes.func.isRequired,
  eligibility: PropTypes.shape({
    category: PropTypes.string.isRequired,
    agency: PropTypes.string.isRequired,
  }).isRequired,
};

export default EligibilityCreator;
