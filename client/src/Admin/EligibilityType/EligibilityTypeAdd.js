import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Input, Button, Form } from 'semantic-ui-react';
import { addEligibilityType } from '../../Actions/eligibilityActions';

function mapStateToProps(state) {
  return { data: state.eligibilityTypes };
}

const valueTypes = [
  {key: 'boolean', value: 'boolean', text: 'boolean'},
  {key: 'number', value: 'number', text: 'number'}
];

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

class EligibilityAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      comparators: [{ val: '' }],
      valueType: ''
    };
  }
  eligibilityName(event) {
    this.setState({ name: event.target.value, msg: '' });
  }
  eligibilityValueType(event, data) {
    this.setState({ valueType: data.value, msg: '' });
  }
  submitEligibilityType(event) {
      event.preventDefault();
      const data = {
        name: this.state.name,
        valueType: this.state.valueType,
        comparators: this.state.comparators
      };

      this.props.dispatch(addEligibilityType(this.state.name, this.state.comparators, this.state.valueType)).then(() => {
        let message = 'Successfully created eligibility type: ' + this.state.name;
        this.setState({ msg: message, name: '', valueType: '', comparators: [{ val: '' }] })
        // if (this.props.data.error) {
        //   let message = this.state.name !== '' ? 'Failed to create agency: ' + this.state.name : 'Failed to create agency.';
        //   this.setState({ msg: message });
        // } else {
        //   let message = 'Successfully created agency: ' + this.state.name;
        //   this.setState({ msg: message, name: '', url: '', emails: [{ address: '' }] })
        // }
      });;
  }
  comparatorValChange = (idx) => (event) => {
    const x = this.state.comparators.find((a, index) => idx === index);
    x.val = event.target.innerText;
  }
  addVal(event) {
    event.preventDefault();
    this.setState({
      comparators: this.state.comparators.concat([{ val: '' }]),
      msg: ''
    });
  }
  removeVal = (idx) => (event) => {
    event.preventDefault();
    this.setState({
      comparators: this.state.comparators.filter((a, eidx) => idx !== eidx),
      msg: ''
    });
  }
  render() {
    return (
      <div>
        <div align="center">
          <Form>
            <Form.Field>
              <Input placeholder='Name' label='Name ' labelPosition='left'
                size='big' fluid={true} className='padding'
                onChange={this.eligibilityName.bind(this)} value={this.state.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Eligibility Type</label>
              <Dropdown placeholder='Select an eligibility type'
                fluid={true} size='big' className='padding' search selection
                options={valueTypes} onChange={this.eligibilityValueType.bind(this)}
              />
            </Form.Field>
              {this.state.comparators.map((val, idx) => (
                <div key={idx} className="padding">
                  <label>Comparator</label>
                    <Dropdown selection options={comparators} onChange={this.comparatorValChange(idx).bind(this)} />
                    <Button negative onClick={this.removeVal(idx).bind(this)} className="padding" >-</Button>
                </div>
              ))}
              <Button color='blue' onClick={this.addVal.bind(this)} className='padding2'>Add Value</Button>
              <Button positive onClick={this.submitEligibilityType.bind(this)}>Add Eligibility Type</Button>
              <h2>{this.state.msg}</h2>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(EligibilityAdd));
