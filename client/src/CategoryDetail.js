import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Item, Loader, List, Segment, Divider, Card } from 'semantic-ui-react';
import fetchCategories from './actions/categoriesActions';
import AgencyMap from './County/AgencyMap.js';


function mapStateToProps(state) {
  return { data: state.categories, chosenCounty: state.counties.chosenCounty };
}

class CategoryDetail extends Component {
  componentWillMount() {
    if (!this.props.data.fetched && this.props.data.categories.length === 0) {
      this.props.dispatch(fetchCategories());
    }
  }

  getSubcategories(category) {
    return category.map(subcat => <List.Item>{subcat.name}</List.Item>);
  }

  render() {
    if (this.props.data.categories.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    if (this.props.match.params.id && this.props.data.categories) {
      const currentCategory = this.props.data.categories.filter(cat => cat._id === this.props.match.params.id)[0];

      if (!currentCategory) {
        return 'ERROR - Could not find subcategory';
      }
      return (
        <div className='card-holder'>
          <h2>{currentCategory.name}</h2>
          {(() => {
            if (currentCategory.agencies.length === 0 && currentCategory.subcategories.length === 0) {
              return <h3>Select an agency:</h3>;
            }
            else if(currentCategory.agencies.length > 0 && currentCategory.agencies.filter((x) => this.props.chosenCounty === "" ? 1 == 1 : x.counties.some((x)=> x === this.props.chosenCounty)).length === 0){
                return <h3>No agencies support this legal issue for your chosen county.</h3>;
            }
            else if (currentCategory.agencies.length > 0 && currentCategory.subcategories.length === 0) {
              return <h3>Select an agency:</h3>;
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
                        currentCategory.agencies.filter((x) => this.props.chosenCounty === "" ? 1 == 1 : x.counties.some((x)=> x === this.props.chosenCounty)).map(agency =>
                            <Card fluid color='blue' href={agency.url}>
                                <Card.Content>
                                    <Card.Header>{agency.name}</Card.Header>
                                    <Card.Meta>
                                        Click to go to this agencies website!
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
                              //return <h3>Click to see subcategories</h3>;
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
                if (currentCategory.agencies.filter((x) => this.props.chosenCounty === "" ? 1 == 1 :  x.counties.some((x)=> x === this.props.chosenCounty)).length > 0 && currentCategory.subcategories.length === 0) {
                    if (currentCategory.agencies.some((x) => x.lat && x.lon)) {
                        return <div>< AgencyMap isMarkerShown={true} agencies={currentCategory.agencies.filter((x) => this.props.chosenCounty === "" ? 1 == 1 :  x.counties.some((x)=> x === this.props.chosenCounty))}/></div>;
                    }
                    else {
                        return <div><h3 style={{margin: '5px'}}>No agencies listed have a physical location</h3></div>;
                    }
                }
            })()}
        </div>);
    } else {
      return 'ERROR - Could not find subcategory';
    }
  }
}

export default withRouter(connect(mapStateToProps)(CategoryDetail));
