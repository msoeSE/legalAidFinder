import React, { Component } from 'react';
import { Button, Input, Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchEligibilities, postEligibilities } from '../Actions/eligibilityActions';


const COMPARATORS = {
  GREATERorEQUAL: '≥',
  GREATER: '>',
  LESS: '<',
  LESSorEQUAL: '≤',
  EQUAL: '=',
};

const comparators = [
  { key: COMPARATORS.EQUAL, value: COMPARATORS.EQUAL, text: COMPARATORS.EQUAL },
  { key: COMPARATORS.GREATER, value: COMPARATORS.GREATER, text: COMPARATORS.GREATER },
  { key: COMPARATORS.LESS, value: COMPARATORS.LESS, text: COMPARATORS.LESS },
  { key: COMPARATORS.LESSorEQUAL, value: COMPARATORS.LESSorEQUAL, text: COMPARATORS.LESSorEQUAL },
  { key: COMPARATORS.GREATERorEQUAL, value: COMPARATORS.GREATERorEQUAL, text: COMPARATORS.GREATERorEQUAL },
];

const keys = [
  { key: 'Income (% of FPL)', value: 'Income (% of FPL)', text: 'Income (% of FPL)' },
  { key: 'Age', value: 'Age', text: 'Age' },
  { key: 'Disability', value: 'Disability', text: 'Disability' },
  { key: 'Veteran', value: 'Veteran', text: 'Veteran' },
];

function mapStateToProps(state) {
  return { info: state.eligibility};
}

class EligibilityCreator extends Component {
  constructor(props) {
    super(props);

    if (!this.props.eligibilities || this.props.eligibilities.length === 0) {
      this.state = {
        data: [ { key: 'Income (% of FPL)', comparator: '<', value: 0 } ],
      };
    } else {
      this.state = {
        data: this.props.eligibilities.key_comparator_value,
      };
    }

    this.addEligibility = this.addEligibility.bind(this);
    this.submitEligibility = this.submitEligibility.bind(this);
    this.removeEligibility = this.removeEligibility.bind(this);
    this.handleComparatorChange = this.handleComparatorChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  submitEligibility() {
    this.props.dispatch(postEligibilities(this.props.agencyId, this.props.categoryId, this.state.data)).then(() => {
      this.props.dispatch(fetchEligibilities());
      this.props.onSubmitted();
    });
  }

  addEligibility(event) {
    event.preventDefault();
    this.setState({
      data: this.state.data.concat([ { key: 'Age', comparator: '<', value: 0 } ]),
    });
  }

  removeEligibility = idx => (event) => {
    event.preventDefault();
    this.setState({
      data: this.state.data.filter((a, eidx) => idx !== eidx),
    });
  };

  handleKeyChange = idx => (event) => {
    const x = this.state.data.find((a, index) => idx === index);
    x.key = event.target.innerText;
  };

  handleComparatorChange = idx => (event) => {
    const x = this.state.data.find((a, index) => idx === index);
    x.comparator = event.target.innerText;
  };

  handleValueChange = idx => (event) => {
    const x = this.state.data.find((a, index) => idx === index);
    x.value = event.target.value;
  };

  render() {
    return (
      <div>
        <h2 className='form-title'>Create new eligibility criteria:</h2>
        <div>
          {this.state.data.map((eligibility, idx) => (
            <div key={idx} style={{ margin: '5px' }}>
              <Dropdown selection options={keys} onChange={this.handleKeyChange(idx).bind(this)} defaultValue={eligibility.key} />
              <Dropdown selection options={comparators} onChange={this.handleKeyChange(idx).bind(this)} defaultValue={eligibility.comparator} />
              <Input placeholder='Value' style={{ marginLeft: '2px' }} onChange={this.handleValueChange(idx).bind(this)} defaultValue={eligibility.value} />
              <Button negative style={{ marginLeft: '2px' }} onClick={this.removeEligibility(idx).bind(this)} icon='minus' />
            </div>
          ))}
        </div>
        <Button color='blue' onClick={this.addEligibility} className='padding'>Add another Eligibility</Button>
        <Button positive onClick={this.submitEligibility}>Submit</Button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(EligibilityCreator));
