import React, { Component } from 'react';
import Client from './Client';

class AgencyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          requestFailed: false,
          agencies: [],
        };
        this.changeName = this.changeName.bind(this);
        this.changeURL = this.changeURL.bind(this);
      }

      changeName(name, event) {
          console.log(
            event.target.value
          )
        this.setState({name: event.target.value});
      }

      changeURL(name, event) {
        console.log(
          event.target.value
        )
      this.setState({url: event.target.value});
    }
    
      componentDidMount() {
        Client.getAgencies()
          .then((d) => {
            this.setState({
              agencies: d.agencies,
            });
          }, () => {
            this.setState({
              requestFailed: true,
            });
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
            <div className="center">
                <table className="agency-table">
                    <thead>
                        <tr>
                            <th>Agency</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.agencies.map((agency) => {
                            return (
                                <tr>
                                    <td>
                                        <input onChange={(e) => this.changeName(agency.name, e)}
                                        type='text' 
                                        className='form-control' 
                                        value={agency.name}/>
                                    </td>
                                    <td>
                                        <input onChange={(e) => this.changeURL(agency.url, e)}
                                        type='text' 
                                        className='form-control' 
                                        value={agency.url}/>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };
};

export default AgencyTable;