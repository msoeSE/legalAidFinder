import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { postEligibilities } from '../Actions/eligibilityActions';

const COMPARATORS = {
  GREATERorEQUAL: '≥',
  GREATER: '>',
  LESS: '<',
  LESSorEQUAL: '≤',
  EQUAL: '=',
};

class EligibilityCreator extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { keyValue: 'Income (% of FPL)', comparatorValue: '<', value: 0 },
      ],
    };

    this.addEligibility = this.addEligibility.bind(this);
    this.submitEligibility = this.submitEligibility.bind(this);
    this.removeEligibility = this.removeEligibility.bind(this);
  }

  submitEligibility() {
    this.props.dispatch(postEligibilities(this.state.data)).then(() => {
      alert('Successful');
    });
  }

  addEligibility(event) {
    event.preventDefault();
    this.setState({
      data: this.state.data.concat([ { keyValue: 'Age', comparatorValue: '<', value: 0 } ]),
    });
  }

  removeEligibility = idx => (event) => {
    event.preventDefault();
    this.setState({
      data: this.state.data.filter((a, eidx) => idx !== eidx),
    });
  };

  handleKeyChange = idx => (event) => {
    const x = this.state.data.find((a, index) => idx !== index);
    x.keyValue = event.target.value;
    this.state.data.find((a, index) => idx !== index)
  };

  handleComparatorChange = idx => (event) => {
    const x = this.state.data.find((a, index) => idx !== index);
    x.comparatorValue = event.target.value;
  };

  handleValueChange = idx => (event) => {
    const x = this.state.data.find((a, index) => idx !== index);
    x.value = event.target.value;
  };

  render() {
    return (
      <div>
        <h2 className='form-title'>Create new eligibility criteria:</h2>
        <div>
          {this.state.data.map((eligibility, idx) => (
            <div key={idx} style={{ margin: '5px' }}>
              <select name='key' onChange={this.handleKeyChange(idx)} >
                <option value='Income (% of FPL)'>Income (% of FPL)</option>
                <option value='Age'>Age</option>
                <option value='Disability'>Disability</option>
                <option value='Veteran'>Veteran</option>
              </select>
              <select name='comparator' style={{ marginLeft: '2px' }} onChange={this.handleComparatorChange(idx)}>
                <option value='<'>{COMPARATORS.LESS}</option>
                <option value='≤'>{COMPARATORS.LESSorEQUAL}</option>
                <option value='>'>{COMPARATORS.GREATER}</option>
                <option value='≥'>{COMPARATORS.GREATERorEQUAL}</option>
                <option value='='>{COMPARATORS.EQUAL}</option>
              </select>
              <input placeholder='Value' style={{ marginLeft: '2px' }} onChange={this.handleValueChange(idx)} />
              <Button negative size='mini' style={{ marginLeft: '2px' }} onClick={this.removeEligibility(idx)} icon='minus' />
            </div>
          ))}
        </div>
        <Button color='blue' onClick={this.addEligibility} className='padding'>Add another Eligibility</Button>
        <Button positive onClick={this.submitEligibility}>Submit</Button>
      </div>
    );
  }
}

export default EligibilityCreator;
