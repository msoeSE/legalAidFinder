import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AgencyAdd from './AgencyAdd';
import AgencyDelete from './AgencyDelete';
import AgencyModify from './AgencyModify';
import { Grid } from "semantic-ui-react";

class Agency extends Component {
  render() {
    return (
      <div>
        <Grid divided='vertically' celled='internally'>
          <Grid.Row columns={2} stretched>
            <Grid.Column>
              <h3>Create a new agency</h3>
              <AgencyAdd />
            </Grid.Column>
            <Grid.Column>
              <h3>Modify an existing agency</h3>
              <AgencyModify />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} stretched>
            <Grid.Column>
              <h3>Delete an agency</h3>
              <AgencyDelete />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Agency;
