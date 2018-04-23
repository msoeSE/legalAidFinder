import React, { Component } from 'react';
import { Modal, Checkbox, Button, Form, Label, Grid, Divider } from 'semantic-ui-react';

class UserEligibilityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: new Set(),
      eligibilityErrorText: '',
      isErrorTextVisible: false,
      numberInputs: [],
      booleanInputs: [],
    };

    this.handleInput = this.handleInput.bind(this);
    this.closePressed = this.closePressed.bind(this);
  }

  /**
   * Makes it so component will always update
   * @param nextProps
   * @param nextState
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    this.state.inputs = new Set();

    return true;
  }

  /**
   * When the X is pressed on top of modal
   */
  closePressed() {
    this.setState({ eligibilityErrorText: '', isErrorTextVisible: false });
    this.props.onClose();
  }

  /**
   * Loops through eligibility and eligibility types and creates arrays for form inputs
   */
  createKcvInputs() {
    if (this.props.eligibilities !== null) {
      this.props.eligibilities.map((elig) => {
        elig.key_comparator_value.map((kcv) => {
          this.props.eligibilityTypes.map((eType) => {
            if (eType.name === kcv.key) {
              if (!this.state.inputs.has(eType.name)) {
                this.state.inputs.add(eType.name);

                if (eType.valueType === 'Yes/No') {
                  this.state.booleanInputs.push(eType.name);
                } else if (eType.valueType === 'Number') {
                  this.state.numberInputs.push(eType.name);
                }
              }
            }
          });
        });
      });
    }
  }

  /**
   * Ensure that all inputs are filled in
   */
  handleInput() {
    let inputsAreAllCompleted = true;

    // Handle number inputs
    this.state.numberInputs.forEach((x) => {
      this.props.eligibilities.map((elig) => {
        elig.key_comparator_value.map((kcv) => {
          if (x === kcv.key) {
            kcv.input = this.refs[x].value;

            if (kcv.input === '') {
              inputsAreAllCompleted = false;
            }
          }
        });
      });
    });

    // Handle checkboxes
    this.state.booleanInputs.forEach((x) => {
      this.props.eligibilities.map((elig) => {
        elig.key_comparator_value.map((kcv) => {
          if (x === kcv.key) {
            kcv.input = (this.refs[x].state && this.refs[x].state.checked) ? 'Yes' : 'No';
          }
        });
      });
    });

    if (inputsAreAllCompleted) {
      this.setState({ eligibilityErrorText: '', isErrorTextVisible: false });
      this.props.onSubmit(this.props.eligibilities);
    } else {
      this.setState({ eligibilityErrorText: 'Please enter values for all eligibility fields', isErrorTextVisible: true });
    }
  }

  render() {
    this.state.inputs = new Set();
    this.state.booleanInputs = [];
    this.state.numberInputs = [];
    this.createKcvInputs();

    return (
      <div>
        <Modal open={this.props.showModal}>
          <Button style={{ marginRight: '7px', marginTop: '7px' }} floated='right' negative onClick={this.closePressed} icon='cancel' />
          <Modal.Header>
            Please enter eligibility values:
          </Modal.Header>
          <Modal.Content>
            <Form>
              { // Loop through and create Number Input fields
                this.state.numberInputs.map((nInput, reactKey) => {
                  if (nInput.toLowerCase().includes('income') && nInput.toLowerCase().includes('%')) {
                    return (<Form.Field key={reactKey}>
                      <label>{nInput} <span style={{ color: 'red' }}>*</span> -<a href='http://www.safetyweb.org/fpl.php' target='_blank'> Income
                        Calculator</a></label>
                      <input type='number' placeholder={nInput} ref={nInput} />
                    </Form.Field>);
                  } else {
                    return (<Form.Field key={reactKey}>
                      <label>{nInput} <span style={{ color: 'red' }}>*</span></label>
                      <input type='number' placeholder={nInput} ref={nInput} />
                    </Form.Field>);
                  }
                })
              }
              {(() => { // Loop through and create Yes/No input fields
                const checkboxes = this.state.booleanInputs.map((bInput, reactKey) => (
                  <Grid.Column key={reactKey + this.state.numberInputs.length} style={{ margin: '8px' }}>
                    <Checkbox value='Yes' ref={bInput} label={bInput} />
                  </Grid.Column>
                ));

                return (
                  <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row>
                      {checkboxes}
                    </Grid.Row>
                  </Grid>
                );
              })()}

              <Divider />
              <Button type='submit' onClick={this.handleInput}>Submit</Button>
              {this.state.isErrorTextVisible && <Label basic color='red'>{this.state.eligibilityErrorText}</Label>}
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default UserEligibilityModal;
