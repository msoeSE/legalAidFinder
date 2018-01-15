import React, { Component } from 'react';
import { Dropdown, Input, Button } from 'semantic-ui-react';
import Client from '../../Client';

class AgencyModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown_agencies: '',
      full_agencies: '',
      nameVal: '',
      urlVal: '',
    };
    this.handleAgency = this.handleAgency.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
  }
  componentDidMount() {
    Client.getAgencies()
      .then((d) => {
        this.setState({
          dropdown_agencies: d.agencies.map((a) => {return {key: a._id, value: a._id, text: a.name}}),
          full_agencies: d.agencies
        });
      }, () => {
        this.setState({
          requestFailed: true,
        });
      });
  }
  handleAgency(event, data) {
    var agency = this.state.full_agencies.find((e) => {return e._id === data.value});
    this.setState({ urlVal: agency.url, nameVal: agency.name });
  }
  handleSubmitAgency(event) {
      const data = {
        name: this.state.nameVal,
        url: this.state.urlVal
      };

      Client.modifyAgencies(data)
        .then((d) => {
          console.log(d);
        });
  }
  render() {
    if (!this.state.dropdown_agencies) {
      return (<div className='ui segment'>
        <p>Loading</p>
        <div className='ui active dimmer'>
          <div className='ui loader' />
        </div>
      </div>);
    }
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmitAgency}>
            <Dropdown placeholder='Agency' search selection options={this.state.dropdown_agencies} onChange={this.handleAgency} />
            <Input placeholder='Name' value={this.state.nameVal} />
            <Input placeholder='URL' value={this.state.urlVal} />
            <Button positive type='Submit' value='Submit'>Modify</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default AgencyModify;