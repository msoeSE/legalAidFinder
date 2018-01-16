import React, { Component } from 'react';
import CountySelector from './CountySelector';
import PropTypes from "prop-types";
import { chooseCounty } from '../actions/countiesActions';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return { data: state.counties };
}

class CountySelect extends Component {

    componentWillMount() {
        //this.props.dispatch(fetchCounties());

    }

    switchCounty = (county) => {
        console.log("Switched: " + county);
        this.setState({chosenCounty: county});
    };

    chooseCounty = () => {
        //this.props.dispatch(chooseCounty(this.state.chosenCounty));
    };

    render() {

        return (
            <div>
                    <div>
                        <h2>Select the county in Wisconsin which you reside in:</h2>
                    </div>
                    <CountySelector handleCountyChange={this.switchCounty} />

                   <a href="/"> <button onClick={this.chooseCounty} className="ui button">
                    Submit
                   </button></a>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(CountySelect));