import React, { Component } from 'react';
import CountySelector from './CountySelector';

class CountySelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestFailed: false,
            counties: [],
        };
    }

    componentDidMount() {

    }

    chooseCounty = (county) => {
        console.log(county);
        this.setState({ chosenCounty: county });
    };

    addSelectedCountyClick() {
        //addSelectedCounty(this.props.chosenCounty);
    }

    render() {
        if (!this.state.counties) {
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
                        <h2>Select the county in Wisconsin which you reside in:</h2>
                    </div>
                    <CountySelector counties={this.state.counties} handleCountyChange={this.chooseCounty} />

                   <a href="/"> <button onClick={this.chooseCounty} className="ui button">
                    Submit
                   </button></a>
            </div>
        );
    }
}

export default CountySelect;