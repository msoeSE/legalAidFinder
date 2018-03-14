import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Form, Loader, List, Divider, Card } from 'semantic-ui-react';
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
      agencies: null,
      eligibilities: null,
      filteredAgencies: [],
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

  getSubcategories(category) {
    return category.map(subcat => <List.Item>{subcat.name}</List.Item>);
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

  onSubmit() {
    alert('Submitted');
  }

  render() {
    if (this.props.data.categories.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    if (this.props.match.params.id && this.props.data.categories) {
      const currentCategory = this.props.data.categories.filter(cat => cat._id === this.props.match.params.id)[0];
      this.state.agencies = currentCategory.agencies;

      if (!currentCategory) {
        return 'ERROR - Could not find subcategory';
      }
      return (
        <div>
          <EligibilityModal showModal={this.state.showModal} eligibilities={this.state.eligibilities} onClose={this.onClose} onSubmit={this.onSubmit} />
          <div className='card-holder'>
            <h2>{currentCategory.name}</h2>
            {(() => {
              if (currentCategory.agencies.length === 0 && currentCategory.subcategories.length === 0) {
                return <h3>No agencies support this legal issue for your chosen county.</h3>;
              } else if (currentCategory.agencies.length > 0 && currentCategory.agencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty)).length === 0) {
                return <h3>No agencies support this legal issue for your chosen county.</h3>;
              } else if (currentCategory.agencies.length > 0 && currentCategory.subcategories.length === 0) {
                return <div><Button onClick={this.eligibilityForm}>For <i>better</i> help/representation please fill in eligibility</Button><h3>The following categories will be able to help you:</h3></div>;
              } else {
                return <h3>Select a subcategory that corresponds with your legal issue:</h3>;
              }
            })()}
            <Divider section />
            <Card.Group>
              {(() => {
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
                if (currentCategory.agencies.length > 0 && currentCategory.subcategories.length === 0) {
                  return (
                    currentCategory.agencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty)).map(agency =>
                      <Card fluid color='blue' href={agency.url}>
                        <Card.Content>
                          <Card.Header>{agency.name}</Card.Header>
                          <Card.Meta>
                            Click to go to this agency's website!
                          </Card.Meta>
                        </Card.Content>
                      </Card>));
                } else {
                  return (
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
                                // return <h3>Click to see subcategories</h3>;
                              }
                            })()}
                          </Card.Meta>
                          <Card.Description>
                            <List bulleted size={'mini'}>
                              {this.getSubcategories(subcat.subcategories)}
                            </List>
                          </Card.Description>
                        </Card.Content>
                      </Card>));
                }
              })()}
            </Card.Group>
            {(() => {
              if (currentCategory.agencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty)).length > 0 && currentCategory.subcategories.length === 0) {
                if (currentCategory.agencies.some(x => x.lat && x.lon)) {
                  return <div><AgencyMap isMarkerShown agencies={currentCategory.agencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty))} /></div>;
                } else {
                  return <div><h3 style={{ margin: '5px' }}>No agencies listed have a physical location</h3></div>;
                }
              }
            })()}
          </div>
        </div>);
    } else {
      return 'ERROR - Could not find subcategory';
    }
  }
}

export default withRouter(connect(mapStateToProps)(CategoryDetail));

class EligibilityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: new Set(),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.state.inputs = new Set();

    return true;
  }

  createKcvInput(kcv, reactKey) {
    if (!this.state.inputs.has(kcv.key)) {
      this.state.inputs.add(kcv.key);
      return (
        <Form.Field key={reactKey}>
          <label>{kcv.key}</label>
          <input placeholder={kcv.key} />
        </Form.Field>
      );
    }
  }

  render() {
    this.state.inputs = new Set();

    return (
      <div>
        <Modal open={this.props.showModal}>
          <Modal.Header>
            Please enter eligibility values:
            <Button floated='right' negative onClick={this.props.onClose} icon='cancel' />
          </Modal.Header>
          <Modal.Content>
            <Form>
              {(() => {
                if (this.props.eligibilities !== null) {
                  return this.props.eligibilities.map((elig, i) =>
                    elig.key_comparator_value.map((kcv, k) => this.createKcvInput(kcv, i + k)));
                }
              })()}
              <Button type='submit' onClick={this.props.onSubmit}>Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
