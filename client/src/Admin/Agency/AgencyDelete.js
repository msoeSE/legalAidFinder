import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import Client from '../../Client';

class AgencyDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      agencies: ''
    };
    this.handleAgencyID = this.handleAgencyID.bind(this);
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this);
  }
  componentDidMount() {
    Client.getAgencies()
      .then((d) => {
        this.setState({
          agencies: d.agencies.map((a) => {return {key: a._id, value: a._id, text: a.name}}),
        });
      }, () => {
        this.setState({
          requestFailed: true,
        });
      });
  }
  handleAgencyID(event, data) {
    this.setState({ id: data.value });
  }
  handleSubmitAgency(event) {
      const data = {
        id: this.state.id,
      };

      Client.deleteAgencies(data)
        .then((d) => {
          console.log(d);
        });
  }
  render() {
    if (!this.state.agencies) {
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
            <Dropdown placeholder='Agency' 
              fluid={true} size='big' 
              className='padding2' 
              search 
              selection 
              options={this.state.agencies} 
              onChange={this.handleAgencyID} 
            />
            <div className='padding2'>
              <Button negative type='Submit' value='Submit' className='padding2'>Delete Agency</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AgencyDelete;