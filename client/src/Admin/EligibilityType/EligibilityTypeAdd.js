import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, Grid, Dropdown, Input, Button, Form } from 'semantic-ui-react';
import { addEligibilityType, deleteEligibilityType, fetchEligibilityType } from '../../Actions/eligibilityActions';
import MagnifyLoader from "../../Helpers/MagnifyLoader";

function mapStateToProps(state) {
  return { data: state.eligibility };
}

const valueTypes = [
  { key: 'Yes/No', value: 'Yes/No', text: 'Yes/No' },
  { key: 'Number', value: 'Number', text: 'Number' },
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

const renderLabel = label => ({
  color: 'blue',
  content: `${label.text}`,
});

class EligibilityAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      comparators: [],
      valueType: '',
    };

    this.comparatorValChange = this.comparatorValChange.bind(this);
    this.removeEligibilityType = this.removeEligibilityType.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchEligibilityType());
  }

  eligibilityName(event) {
    this.setState({ name: event.target.value, msg: '' });
  }

  eligibilityValueType(event, data) {
    this.setState({ valueType: data.value, msg: '' });
  }

  submitEligibilityType(event, data) { // TODO: Follow data pattern from category to get this to work???
    event.preventDefault();

    if (this.state.name === '') {
      this.setState({
        msg: 'Eligibility Type Name is required',
      });
      return;
    }

    if (this.state.comparators.length === 0) {
      this.setState({
        msg: 'Eligibility Type must have at least one comparator',
      });
      return;
    }

    if (this.state.valueType === '') {
      this.setState({
        msg: 'Eligibility Value Type is required',
      });
      return;
    }

    this.props.dispatch(addEligibilityType(this.state.name, this.state.comparators, this.state.valueType)).then(() => {
      if (this.props.data.error) {
        const message = this.state.name !== '' ? `Failed to create eligibility type: ${this.state.name}` : 'Failed to create eligibility type.';
        this.setState({ msg: message });
      } else {
        this.props.dispatch(fetchEligibilityType());
        const message = `Successfully created eligibility type: ${this.state.name}`;
        this.setState({ msg: message, name: '' });
      }
    });
  }

  comparatorValChange(event) {
    this.setState({
      comparators: event.val,
    });
  }

  removeEligibilityType(data) {
    this.setState({
      msg: '',
    });

    this.props.dispatch(deleteEligibilityType(data._id)).then(() => {
      this.handleResponse();
    });
  }

  handleResponse() {
    if (this.props.data.error) {
      alert(`Error deleting Eligibility Type: ${this.props.data.error}`);
    }
  }

  render() {
    return (
      <div>
        <Grid divided='vertically' celled='internally' centered>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div>
                <h3>Create New Eligibility Type: </h3>
                <Form>
                  <Form.Field>
                    <Input
                      placeholder='e.g. Income'
                      label='Eligibility Name '
                      labelPosition='left'
                      onChange={this.eligibilityName.bind(this)}
                      value={this.state.name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Value Type</label>
                    <Dropdown
                      placeholder='Select an value type'
                      search
                      selection
                      options={valueTypes}
                      onChange={this.eligibilityValueType.bind(this)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Comparators</label>
                    <Dropdown
                      multiple
                      selection
                      options={comparators}
                      placeholder='Select which comparators can be used'
                      renderLabel={renderLabel}
                      onChange={(e, { value }) => this.setState({ comparators: [ ...value ] })}
                    />
                  </Form.Field>
                  <Button positive onClick={this.submitEligibilityType.bind(this)}>Add Eligibility Type</Button>
                  <h2>{this.state.msg}</h2>
                </Form>
              </div>
            </Grid.Column>
            <Grid.Column>
              <h3>Existing Eligibility Types:</h3>
              {(() => {
                if (!this.props.data.eligibilityTypesFetched) {
                  return (<MagnifyLoader label='Loading Eligibility Types...' />);
                }

                if (this.props.data.eligibilityTypes.length > 0) {
                  const eligTypes = this.props.data.eligibilityTypes.map(et => (
                    <List.Item>
                      <List.Content floated='right'>
                        <Button onClick={() => this.removeEligibilityType(et)}>Delete</Button>
                      </List.Content>
                      <List.Content>
                        <List.Header>{et.name}</List.Header>
                        <List.Description>
                          Type: {et.valueType} <br />
                          Comparators: {et.comparators.join(', ')}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  ));

                  return (
                    <div>
                      <List divided relaxed>
                        {eligTypes}
                      </List>
                    </div>
                  );
                } else {
                  return <p>Currently No Eligibility Types Created</p>;
                }
              })()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(EligibilityAdd));
