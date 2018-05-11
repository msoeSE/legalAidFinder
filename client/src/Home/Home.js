import React, { Component } from 'react';
import {
    Link, withRouter,
} from 'react-router-dom';
import { Button, Header, Icon, Label } from 'semantic-ui-react';
import {fetchCategoriesAndDropdown} from "../Actions/categoriesActions";
import {connect} from "react-redux";
import {fetchTitleAndDescription} from "../Actions/homePageActions";

function mapStateToProps(state) {
    return { title: state.title, description: state.description };
}

class Home extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: "",
            description: "",
        };
    }*/

    componentWillMount() {
        this.props.dispatch(fetchCategoriesAndDropdown()); // TODO: Fetch home page content
        this.props.dispatch(fetchTitleAndDescription());
    }


  render() { // TODO: Pull all of the content from database
    return (
      <div className='homePage'>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
              {this.props.title}
              </Header.Content>
          <Icon name='law' circular fitted size='huge' />
        </Header>
        <div>
          <Label basic size='big'>
          Do you have a legal issue, but can’t afford to hire an attorney? Then you came to the right place!
          <br />
            <br />
              {this.props.description}
          <br />
            <br />
          To get started, click the button below!
          </Label>
          <br />
          <br />
          <Link to='/workflow'>
            <Button className='large ui blue button'>Legal Aid Finder</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Home));
