import React, { Component } from 'react';
import { Tab, Container, Header } from 'semantic-ui-react';
import AgencyCategoryTree from './AgencyCategoryTree';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import fetchCategories from '../actions/categoriesActions';
import {withRouter} from "react-router-dom";

function mapStateToProps(state) {
  return { data: state.categories };
}

class AgencyHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency: props.agency,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    if (this.props.data.categories.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    const parents = this.props.data.categories.filter(category => category.parent === null);

    const tabs = parents.map((category) => {
      return (
      { menuItem: category.name,
        render: () =>
          <Tab.Pane><div className='tab-content'>
            <Container fluid>
              <Header as='h2' textAlign='center'>Select which categories your agency can provide legal services for:</Header>
              <AgencyCategoryTree agencyId='5a04d2e3ec140922c08a6717' categoryId={category._id} />
            </Container>
          </div></Tab.Pane> });
    });

    const panes = [
      { menuItem: 'Home',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>Agency Name Goes Here</Header>
          </Container>
        </div></Tab.Pane> },
    ].concat(tabs);

    panes.push(
      { menuItem: 'Global Eligibility',
        render: () => <Tab.Pane><div className='tab-content'>
          <Container fluid textAlign='center'>
            <Header as='h2'>View Global Eligibility</Header>
          </Container>
        </div></Tab.Pane> });

    return (
      <Tab panes={panes} />
    );
  }
}

export default withRouter(connect(mapStateToProps)(AgencyHome));
