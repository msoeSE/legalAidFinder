import React, { Component } from 'react';
import Link from 'react-router';
import PropTypes from 'prop-types';
import CountySelector from './CountySelector';
import Client from '../Client';

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
                <button className="ui button">
                    Submit
                </button>
            </div>
        );
    }
}

// Actions required to provide data for this component to render in sever side.
//CountySelectPage.need = [() => { return fetchCounties(); }];

// Retrieve data from store as props

CountySelect.propTypes = {
    counties: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        state: PropTypes.string,
        _id: PropTypes.string.isRequired,
    })).isRequired,
    chosenCounty: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
};

CountySelect.contextTypes = {
    router: PropTypes.object,
};

export default CountySelect;