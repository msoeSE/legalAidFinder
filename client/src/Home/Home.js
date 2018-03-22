import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { Button } from 'semantic-ui-react';



class Home extends Component {
  render() {
    return (
      <div className='homePage'>
        <h1 className='homePageTitle'> Welcome to Wisconsin Civil Legal Aid! </h1>
        <div>
          Do you have a legal issue, but can’t afford to hire an attorney? Then you came to the right place!
          <br />
          <br />
          Wisconsin Civil Legal Aid helps provide you with the information you need in order to request legal aid.  All you have to do is identify
          your legal issue, and we will output a list of agencies that support your issue.  From there, you may contact the agency and receive the
          proper assistance you need.
          <br />
          <br />
          To get started, click the button below!
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

export default Home;
