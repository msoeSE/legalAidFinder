import React, { Component } from 'react';
import CountySelector from './CountySelector';
import PropTypes from "prop-types";

class CountySelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestFailed: false,
            counties: [],
            chosenCounty: ""
        };
    }

    componentDidMount() {

    }

    chooseCounty = (county) => {
        console.log("CountySelect: " + county);
        this.setState({ chosenCounty: county });
        this.props.callback(county);
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

                   <a href="/"> <button className="ui button">
                    Submit
                   </button></a>
            </div>
        );
    }
}

CountySelector.propTypes = {
    callback: PropTypes.func
};

export default CountySelect;