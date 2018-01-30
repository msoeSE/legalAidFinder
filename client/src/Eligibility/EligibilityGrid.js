import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { VIEW_ELIGIBILITY, NEW_ELIGIBILITY } from '../AgencyHome/Checkbox';

class EligibilityGrid extends Component {
  render() {
    if (!this.props.showGrid) {
      return null;
    }

    return (
      <div>
        <Grid celled textAlign='center'>
          <Grid.Row columns={3}>
            <Grid.Column>
              Current number of eligibility constraints:<br />{this.props.count}
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.props.handleClick(VIEW_ELIGIBILITY)}>Edit Current Eligbility</Button>
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.props.handleClick(NEW_ELIGIBILITY)}>Add New Eligibility</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default EligibilityGrid;
