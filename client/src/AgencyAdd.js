import React, { Component } from 'react';
import request from 'superagent';

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

      request
        .post('/agencies')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .end((err, res) => {
          if (err || !res.ok) {
            console.log('Oh no! err');
            console.log(err)
          } else {
            console.log('Success');
          }
        });
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
            <input
              onChange={this.handleAgencyURL}
              value={this.state.url}
            />
            <button type='Submit' value='Submit'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AgencyAdd;