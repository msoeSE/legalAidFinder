import React, { Component } from 'react';
import Client from './Client';

class AgencyDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: ''
    };
    this.handleAgencyName = this.handleAgencyName.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
  }
  handleAgencyName(event) {
    this.setState({ name: event.target.value });
  }
  handleAgencyURL(event) {
      this.setState({ url: event.target.value });
  }
  handleSubmitAgency(event) {
      const data = {
        name: this.state.name,
        url: this.state.url,
      };

      Client.postAgencies(data, event);
        console.log(this.state.name)
        console.log(this.state.url)
  }
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmitAgency}>
            <input
              onChange={this.handleAgencyName}
              value={this.state.name}
            />
            <button type='Submit' value='Submit'>Delete</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AgencyDelete;