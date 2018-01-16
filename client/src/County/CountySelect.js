import React, { Component } from 'react';
import CountySelector from './CountySelector';
import { chooseCounty } from '../actions/countiesActions';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return { data: state.counties };
}

class CountySelect extends Component {

    componentWillMount() {
        //this.props.dispatch(fetchCounties());

    }

    switchCounty = (county) => {
        //console.log("Switched: " + county);
        //this.setState({chosenCounty: county});
    };

    render() {

        return (
            <div>
                    <div>
                        <h2>Select the county in Wisconsin which you reside in:</h2>
                    </div>
                    <CountySelector handleCountyChange={this.switchCounty} />

                <Link to="/">Submit</Link>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(CountySelect));