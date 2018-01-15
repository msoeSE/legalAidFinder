import React, { Component } from 'react';
import AgencyAdd from './Agency/AgencyAdd';
import AgencyDelete from './Agency/AgencyDelete';
import AgencyModify from './Agency/AgencyModify';

class AdminPage extends Component {
  render() {
    return (
      <div>
        <AgencyAdd />
        <AgencyDelete />
        <AgencyModify />
      </div>
    );
  }
}

export default AdminPage;
