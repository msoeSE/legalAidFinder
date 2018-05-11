import React, { Component } from 'react';
import {
    Link, withRouter,
} from 'react-router-dom';
import { Button, Header, Label } from 'semantic-ui-react';
import {connect} from "react-redux";
import {fetchTitleAndDescription} from "../Actions/homePageActions";

function mapStateToProps(state) {
    return { data: state.homePage };
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchTitleAndDescription());
    }


  render() { // TODO: Pull all of the content from database
    return (
      <div className='homePage'>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
              {this.props.data.title}
              </Header.Content>
        </Header>
        <div>
          <Label basic size='big'>
              {this.props.data.description}
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
