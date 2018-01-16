import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Image, Loader, List } from 'semantic-ui-react';
import fetchCategories from './actions/categoriesActions';
import { chooseCounty} from "./actions/countiesActions";
import moneyImg from './images/money.png';
import crimeImg from './images/crime.png';
import healthImg from './images/health.png';
import homeImg from './images/home.png';
import immImg from './images/immigration.png';
import schoolImg from './images/school.png';
import workImg from './images/work.png';
import famImg from './images/family.png';
import store from './store.js';

function mapStateToProps(state) {
  console.log(store.getState());
  return { data: state.categories, chosenCounty: state.counties.chosenCounty };
}

class CategoryExplorer extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories());
    //this.props.dispatch(chooseCounty("Clark"));
  }

  render() {
    if (this.props.data.categories.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    return (
      <div className='card-holder'>
        <h2>Select a category that corresponds with your legal issue:</h2>
        <Card.Group itemsPerRow={4} reversed='mobile vertically'>
          {
            this.props.data.categories.map((category) =>
              category.parent === null ?
                <CategoryCard
                  key={category._id}
                  category={category}
                />
                : null)
          }
        </Card.Group>
      </div>);
  }
}

class CategoryCard extends Component {

  getCorrespondingImage() {
    switch (this.props.category.name) {
      case 'Business & Work':
        return <Image floated='right' size='mini' src={workImg} />;
      case 'Immigration':
        return <Image floated='right' size='mini' src={immImg} />;
      case 'Crime & Traffic':
        return <Image floated='right' size='mini' src={crimeImg} />;
      case 'Health & Benefits':
        return <Image floated='right' size='mini' src={healthImg} />;
      case 'House & Apartment':
        return <Image floated='right' size='mini' src={homeImg} />;
      case 'Juvenile & School':
        return <Image floated='right' size='mini' src={schoolImg} />;
      case 'Money & Debt':
        return <Image floated='right' size='mini' src={moneyImg} />;
      case 'Family & Safety':
        return <Image floated='right' size='mini' src={famImg} />;
      default:
        return null;
    }
  }

  getSubcategories() {
    return this.props.category.subcategories.map((subcat) => {
      return <List.Item>{subcat.name}</List.Item>;
    });
  }

  render() {
    return (
      <Card as={Link} to={`category/${this.props.category._id}`} color='blue' raised>
        <Card.Content>
          {this.getCorrespondingImage()}
          <Card.Header>
            {this.props.category.name}
          </Card.Header>
          <Card.Meta>
            Sub-Categories:
          </Card.Meta>
          <Card.Description>
            <List bulleted size={'mini'}>
              {this.getSubcategories()}
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra size={'mini'}>
          Click for more information
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CategoryExplorer));
