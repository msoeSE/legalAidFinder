import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Modal, Button, Form, Loader, List, Divider, Card, Label } from 'semantic-ui-react';
import { fetchCategories } from '../Actions/categoriesActions';
import AgencyMap from '../County/AgencyMap';
import { getCategoryEligibilities } from '../Reducers/eligibilityReducer';
import { fetchEligibilities } from '../Actions/eligibilityActions';

function mapStateToProps(state) {
  return { data: state.categories, chosenCounty: state.counties.chosenCounty, elig: state.eligibility };
}

class CategoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      criteriaFilledOut: false,
      eligibilities: getCategoryEligibilities(this.props.elig, this.props.match.params.id),
      filteredAgencies: [],
      noEligAgencies: [],
      agencies: [],
    };

    this.eligibilityForm = this.eligibilityForm.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (!this.props.data.fetched && this.props.data.categories.length === 0) {
      this.props.dispatch(fetchCategories());
    }

    if (this.props.elig.eligibility.length === 0) {
      this.props.dispatch(fetchEligibilities());
    }
  }

  eligibilityForm() {
    this.setState({
      showModal: true,
      eligibilities: getCategoryEligibilities(this.props.elig, this.props.match.params.id),
    });
  }

  onClose() {
    this.setState({
      showModal: false,
    });
  }

  onSubmit(data) {
    console.log(this.state.eligibilities);
    this.filterAgencies();
    this.setState({
      showModal: false,
      criteriaFilledOut: true,
    });
  }

  getAgenciesWithNoEligibility(agencies) {
    return agencies.filter(agency => !this.state.eligibilities.some(x => x.agency === agency._id));
  }

  filterAgencies() {
    const validAgencies = [];

    this.state.agencies.forEach((agency) => {
      this.state.eligibilities.forEach((eligibility) => {
        let valid = true;
        if (eligibility.agency === agency._id) {
          eligibility.key_comparator_value.forEach((kcv) => {
            try {
              let input = kcv.input.toLowerCase();
              let val = kcv.value.toLowerCase();

              if (!isNaN(parseFloat(val))) {
                input = parseFloat(input);
                val = parseFloat(val);
              }

              switch (kcv.comparator) {
                case '>':
                  if (input <= val) {
                    valid = false;
                  }
                  break;
                case '≥':
                  if (input < val) {
                    valid = false;
                  }
                  break;
                case '<':
                  if (input >= val) {
                    valid = false;
                  }
                  break;
                case '≤':
                  if (input > val) {
                    valid = false;
                  }
                  break;
                case '=':
                  if (input !== val) {
                    valid = false;
                  }
                  break;
                default:
                  valid = false;
                  break;
              }
            } catch (err) {
              valid = false;
            }
          });

          if (valid) {
            console.log(agency.name);
            validAgencies.push(agency);
          }
        }
      });
    });

    this.setState({ filteredAgencies: validAgencies });
  }

  render() {
    if (this.props.data.categories.length === 0 || this.props.elig.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    if (this.props.match.params.id && this.props.data.categories) {
      const currentCategory = this.props.data.categories.filter(cat => cat._id === this.props.match.params.id)[0];
      this.state.eligibilities = getCategoryEligibilities(this.props.elig, this.props.match.params.id);
      this.state.noEligAgencies = this.getAgenciesWithNoEligibility(currentCategory.agencies);
      this.state.agencies = currentCategory.agencies;

      // action to add current category to store

      if (!currentCategory) {
        return 'ERROR - Could not find subcategory';
      }

      return (
        <div>
          <EligibilityModal showModal={this.state.showModal} eligibilities={this.state.eligibilities} onClose={this.onClose} onSubmit={this.onSubmit} />
          <div className='card-holder'>
            <h2>{currentCategory.name}</h2>
            {(() => { // Create header
              if (currentCategory.agencies.length === 0 && currentCategory.subcategories.length === 0) {
                return <h3>No agencies support this legal issue for your chosen county.</h3>;
              } else if (currentCategory.agencies.length > 0 && currentCategory.agencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty)).length === 0) {
                return <h3>No agencies support this legal issue for your chosen county.</h3>;
              } else if (currentCategory.agencies.length > 0 && currentCategory.subcategories.length === 0 && this.state.eligibilities.length > 0) {
                if (!this.state.criteriaFilledOut) {
                  return (
                    <Button icon labelPosition='right' onClick={this.eligibilityForm}>
                        Enter eligibility criteria for the <i>best</i> representation
                        <Icon name='right arrow' />
                    </Button>
                  );
                } else {
                  return (
                    <Button icon labelPosition='right' onClick={this.eligibilityForm}>
                        Enter eligibility criteria for the <i>best</i> representation
                        <Icon name='checkmark' color='green' />
                    </Button>
                  );
                }
              } else {
                return <h3>Select a subcategory that corresponds with your legal issue:</h3>;
              }
            })()}
            {(() => { // Display eligible agencies
              if (this.state.filteredAgencies.length > 0) {
                const cards = this.state.filteredAgencies.map(agency => (
                  <Card fluid color='blue' href={agency.url}>
                    <Card.Content>
                      <Card.Header>{agency.name}</Card.Header>
                      <Card.Meta>
                        {'Click to go to this agency\'s website!'}
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                ));

                return (
                  <div>
                    <Divider section />
                    <div>
                      <h3>The agencies below can provide the <i>best</i> services for you!</h3>
                      <Card.Group>
                        {cards}
                      </Card.Group>
                    </div>
                  </div>
                );
              }
            })()}
            <Divider section />
            {(() => { // Create Agencies list with no eligibility constraints
              if (currentCategory.agencies.length === 0 && currentCategory.subcategories.length === 0) {
                return (
                  <Card fluid color='blue'>
                    <Card.Content>
                      <Card.Header>Currently no agencies support this category..</Card.Header>
                      <Card.Meta>
                          Please contact Wisconsin Legal Aid Finder for help.
                        </Card.Meta>
                    </Card.Content>
                  </Card>);
              }
              if (this.state.noEligAgencies.length > 0 && currentCategory.subcategories.length === 0) {
                const cards = this.state.noEligAgencies.map(agency => (
                  <Card fluid color='blue' href={agency.url}>
                    <Card.Content>
                      <Card.Header>{agency.name}</Card.Header>
                      <Card.Meta>
                        {'Click to go to this agency\'s website!'}
                      </Card.Meta>
                    </Card.Content>
                  </Card>));

                return (
                  <div>
                    <h3>The following agencies can help you:</h3>
                    <Card.Group>
                      {cards}
                    </Card.Group>
                  </div>
                );
              } else {
                return ( // Create subcategories
                    currentCategory.subcategories.map(subcat =>
                      <Card fluid color='blue' as={Link} to={`${subcat._id}`}>
                        <Card.Content>
                          <Card.Header>{subcat.name}</Card.Header>
                          <Card.Meta>
                            {(() => {
                              if (subcat.agencies.length === 0 && subcat.subcategories.length === 0) {
                                return <h3>Currently no Agencies support this category..</h3>;
                              } else if (subcat.agencies.length > 0 && subcat.subcategories.length === 0) {
                                return <h3>Click to see list of Agencies who can help!</h3>;
                              } else {
                                // Nothing
                              }
                            })()}
                          </Card.Meta>
                          <Card.Description>
                            <List bulleted size={'mini'}>
                              {subcat.subcategories.map(subcat => <List.Item>{subcat.name}</List.Item>)}
                            </List>
                          </Card.Description>
                        </Card.Content>
                      </Card>));
              }
            })()}
          </div>
          {(() => { // Create Map
            const mappedAgencies = this.state.noEligAgencies.concat(this.state.filteredAgencies);

            if (mappedAgencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty)).length > 0 && currentCategory.subcategories.length === 0) {
              if (mappedAgencies.some(x => x.lat && x.lon)) {
                return <div><AgencyMap isMarkerShown agencies={mappedAgencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty))} /></div>;
              } else {
                return <div><h3 style={{ margin: '5px' }}>No agencies listed have a physical location</h3></div>;
              }
            }
          })()}
        </div>);
    } else {
      return 'ERROR - Issue generating categories, please refresh!';
    }
  }
}

export default withRouter(connect(mapStateToProps)(CategoryDetail));

class EligibilityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: new Set(),
      eligibilityErrorText: '',
      isErrorTextVisible: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.closePressed = this.closePressed.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.state.inputs = new Set();

    return true;
  }

  closePressed() {
    this.setState({ eligibilityErrorText: '', isErrorTextVisible: false });
    this.props.onClose();
  }

  createKcvInput(kcv, reactKey) {
    const key = kcv.key.toLowerCase();
    if (!this.state.inputs.has(key)) {
      this.state.inputs.add(key);
      return (
        <Form.Field key={reactKey}>
          <label>{kcv.key}</label>
          <input placeholder={kcv.key} ref={key} />
        </Form.Field>
      );
    }
  }

  handleInput() {
    let inputsAreAllCompleted = true;
    this.state.inputs.forEach((x) => {
      this.props.eligibilities.map((elig) => {
        elig.key_comparator_value.map((kcv) => {
          if (x === kcv.key.toLowerCase()) {
            kcv.input = this.refs[x].value;
            if (kcv.input === '') {
              inputsAreAllCompleted = false;
            }
          }
        });
      });
    });

    if (inputsAreAllCompleted) {
      this.setState({ eligibilityErrorText: '', isErrorTextVisible: false });
      this.props.onSubmit(this.props.eligibilities);
    } else {
      this.setState({ eligibilityErrorText: 'Please enter values for all eligibility criteria', isErrorTextVisible: true });
    }
  }

  render() {
    this.state.inputs = new Set();

    return (
      <div>
        <Modal open={this.props.showModal}>
          <Modal.Header>
            Please enter eligibility values:
            <Button floated='right' negative onClick={this.closePressed} icon='cancel' />
          </Modal.Header>
          <Modal.Content>
            <Form>
              {(() => {
                if (this.props.eligibilities !== null) {
                  return this.props.eligibilities.map((elig, i) =>
                    elig.key_comparator_value.map((kcv, k) => this.createKcvInput(kcv, i + k)));
                }
              })()}
              <Button type='submit' onClick={this.handleInput}>Submit</Button>
              {this.state.isErrorTextVisible && <Label basic color='red'>{this.state.eligibilityErrorText}</Label>}
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
