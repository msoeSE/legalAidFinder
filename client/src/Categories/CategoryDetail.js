import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Button, Loader, List, Divider, Card } from 'semantic-ui-react';
import { fetchCategories } from '../Actions/categoriesActions';
import AgencyMap from '../County/AgencyMap';
import AgencyModal from './AgencyModal';
import { getCategoryEligibilities } from '../Reducers/eligibilityReducer';
import { fetchEligibilities, fetchEligibilityType } from '../Actions/eligibilityActions';
import UserEligibilityModal from './UserEligibilityModal';

function mapStateToProps(state) {
  return { data: state.categories, chosenCounty: state.counties.chosenCounty, elig: state.eligibility, eligibilityTypes: state.eligibility.eligibilityTypes };
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

    if (this.props.eligibilityTypes.length === 0) {
      this.props.dispatch(fetchEligibilityType());
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

  onSubmit() {
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
              if (this.props.eligibilityTypes.find(x => x.name === kcv.key)) {
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
              }
            } catch (err) {
              valid = false;
            }
          });

          if (valid) {
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
          <UserEligibilityModal showModal={this.state.showModal} eligibilities={this.state.eligibilities} eligibilityTypes={this.props.eligibilityTypes} onClose={this.onClose} onSubmit={this.onSubmit} />
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
              } else if (currentCategory.subcategories.length > 0) {
                return <h3>Select a subcategory that corresponds with your legal issue:</h3>;
              }
            })()}
            {(() => { // Display eligible agencies
              if (this.state.filteredAgencies.length > 0) {
                const cards = this.state.filteredAgencies.map(agency => (
                  <Card fluid color='grey' href={agency.url}>
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
                  <Card fluid color='grey'>
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
                  <AgencyModal
                    showModal
                    onClose={this.toggleModal}
                    agency={agency}
                  />));

                return (
                  // currentCategory.agencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty)).map(agency =>
                  //   <Card fluid color='blue'>
                  //     <Card.Content>
                  //       <Card.Header>{agency.name}</Card.Header>
                  //       <Card.Meta>
                  //         <AgencyModal
                  //           showModal
                  //           onClose={this.toggleModal}
                  //           agency={agency}
                  //         />
                  //       </Card.Meta>
                  //     </Card.Content>
                  //   </Card>));
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
                      <Card fluid color='grey' as={Link} to={`${subcat._id}`}>
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
                return(
                  <div className='agency-map-div'>
                    <AgencyMap 
                      isMarkerShown 
                      agencies={mappedAgencies.filter(x => this.props.chosenCounty === '' ? 1 === 1 : x.counties.some(x => x === this.props.chosenCounty))} />
                  </div>);
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
