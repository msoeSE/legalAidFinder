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
    if (this.state.keyValue && this.state.comparatorValue && valueRef.value) {
      this.props.addEligibility(this.props.eligibility.category, this.props.eligibility.agency, this.state.keyValue, this.state.comparatorValue, valueRef.value).then(() => {
        alert('Created new Eligibility!');
      });
      this.state.keyValue = this.state.comparatorValue = valueRef.value = '';
    }
  };

  render() {
    return (
      <div>
        <div className='form-content'>
          <h2 className='form-title'>Create new eligibility criteria:</h2>
          <select name="key" className='form-field' onChange={this.handleKeyChange} >
            <option value="Income (% of FPL)">Income (% of FPL)</option>
            <option value="Age">Age</option>
            <option value="Disability">Disability</option>
            <option value="Veteran">Veteran</option>
          </select>
          <select name="comparator" className='form-field' onChange={this.handleComparatorChange}>
            <option value="<">&lt;</option>
            <option value="≤">≤</option>
            <option value=">">&gt;</option>
            <option value="≥">≥</option>
            <option value="=">=</option>
          </select>
          <input placeholder="Value" className='form-field' ref="value" />
          <button id="submitButton" className='eligibility-submit-button' onClick={this.addEligibility}>Submit</button>
        </div>
      </div>
    );
  }
}

EligibilityCreator.propTypes = {
  //addEligibility: PropTypes.func.isRequired,
  eligibility: PropTypes.shape({
    category: PropTypes.string.isRequired,
    agency: PropTypes.string.isRequired,
  }).isRequired,
};

export default EligibilityCreator;
