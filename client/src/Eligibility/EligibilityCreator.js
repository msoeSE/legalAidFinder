import React, { Component } from 'react';
import { Form, Divider, Button, Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEligibilities, postEligibilities } from '../Actions/eligibilityActions';

function mapStateToProps(state) {
  return { eligibilityTypes: state.eligibility.eligibilityTypes };
}

class EligibilityCreator extends Component {
  constructor(props) {
    super(props);

    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleComparatorChange = this.handleComparatorChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.createNewEligibilitySection = this.createNewEligibilitySection.bind(this);
    this.addEligibility = this.addEligibility.bind(this);
    this.submitEligibility = this.submitEligibility.bind(this);

    this.state = {
      keys: [],
      comparators: [],
      key: null,
      comparator: null,
      value: null,
      keyIsBool: false,
      data: this.props.kcvList,
    };
  }

  submitEligibility() {
    this.props.dispatch(postEligibilities(this.props.agencyId, this.props.categoryId, this.state.data)).then(() => {
      this.props.dispatch(fetchEligibilities());
      this.props.onSubmitted();
    });
  }

  /**
   * Create new eligibility
   */
  addEligibility() {
    if (!this.state.key || !this.state.comparator || !this.state.value) {
      alert('Key, Comparator, Value required!');
      return;
    }

    this.setState({
      data: this.state.data.concat([ { key: this.state.key, comparator: this.state.comparator, value: this.state.value } ]),
    });
  }

  /**
   * Removes eligibility from temp data array. Not final until submit is pressed
   * @param idx
   * @returns {function(*)}
   */
  removeEligibility = idx => (event) => {
    event.preventDefault();
    this.setState({
      data: this.state.data.filter((a, eidx) => idx !== eidx),
    });
  };

  /**
   * When key is changed we need to update possible Comparator and ValueType inputs
   * @param event
   * @param result
   */
  handleKeyChange(event, result) {
    this.state.key = result.value;
    const comparators = [];
    let isBool = false;
    this.props.eligibilityTypes.some((x) => {
      if (x.name === result.value) {
        x.comparators.forEach((val) => {
          comparators.push({ key: val, value: val, text: val });
        });

        if (x.valueType === 'Yes/No') {
          isBool = true;
        }

        return true;
      }

      return false;
    });

    this.setState({
      comparators,
      keyIsBool: isBool,
    });
  }

  /**
   * Update comparator value
   * @param event
   * @param result
   */
  handleComparatorChange(event, result) {
    this.state.comparator = result.value;
  }

  /**
   * Update current value
   * @param event
   * @param result
   */
  handleValueChange(event, result) {
    this.state.value = result.value;
  }

  /**
   * Creates list of existing Eligibilities (Not editable)
   * @returns {any[]}
   */
  createContent() {
    return this.props.eligibilityTypes.map(eType => this.state.data.map((kcv, idx) => {
      if (kcv.key === eType.name) {
        return (<div key={idx} style={{ margin: '5px' }}>
          <Input readOnly style={{ marginLeft: '2px' }} defaultValue={kcv.key} />
          <Input readOnly style={{ marginLeft: '2px' }} defaultValue={kcv.comparator} />
          <Input readOnly style={{ marginLeft: '2px' }} defaultValue={kcv.value} />
          <Button negative style={{ marginLeft: '2px' }} onClick={this.removeEligibility(idx).bind(this)} icon='minus' />
        </div>
        );
      }
    }));
  }

  /**
   * Update value for Yes/No eligibility types
   * @param e
   * @param value
   */
  handleRadioChange = (e, { value }) => {
    this.setState({ value });
  };

  /**
   * Create section that is used to make new eligibility types
   * @returns {*}
   */
  createNewEligibilitySection() {
    if (this.state.keys.length === 0) {
      this.props.eligibilityTypes.forEach((x) => {
        this.state.keys.push({ key: x.name, value: x.name, text: x.name });
      });
    }

    let input;
    if (this.state.keyIsBool) {
      input = (<div style={{ marginLeft: '5px' }}>
        <Form.Radio
          label='Yes'
          name='radioGroup'
          value='Yes'
          checked={this.state.value === 'Yes'}
          onChange={this.handleRadioChange}
        />
        <Form.Radio
          label='No'
          name='radioGroup'
          value='No'
          checked={this.state.value === 'No'}
          onChange={this.handleRadioChange}
        />
      </div>
    );
    } else {
      input = <Input type='number' placeholder='Value' style={{ marginLeft: '2px' }} onChange={this.handleValueChange} defaultValue={this.state.value} />;
    }

    return (
      <Form style={{ margin: '5px' }}>
        <Form.Group inline>
          <Dropdown upward selection style={{ marginLeft: '2px' }} options={this.state.keys} onChange={this.handleKeyChange} />
          <Dropdown upward selection style={{ marginLeft: '2px' }} options={this.state.comparators} onChange={this.handleComparatorChange} />
          {input}
          <Button positive style={{ marginLeft: '2px' }} onClick={this.addEligibility}>Add</Button>
        </Form.Group>
      </Form>
    );
  }

  render() {
    return (
      <div>
        <h3 className='form-title'>Existing eligibility criteria:</h3>
        <div>
          {this.createContent()}
        </div>
        <h3 className='form-title'>Create new eligibility criteria:</h3>
        <div>
          {this.createNewEligibilitySection()}
        </div>
        <Divider />
        <Button positive onClick={this.submitEligibility}>Submit Changes</Button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(EligibilityCreator));
