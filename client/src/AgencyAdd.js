import React, { Component } from 'react';
import Client from './Client';

class AgencyAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: ''
    };
    this.handleAgencyName = this.handleAgencyName.bind(this);
    this.handleAgencyURL = this.handleAgencyURL.bind(this);
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

      Client.postAgencies(data)
        .then((d) => {
          console.log(d);
        });
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
            <input
              onChange={this.handleAgencyURL}
              value={this.state.url}
            />
            <button type='Submit' value='Submit'>Add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AgencyAdd;
