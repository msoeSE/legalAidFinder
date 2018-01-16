import React, { Component } from 'react';
import CountySelector from './CountySelector';
import {withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux';
import {Button} from 'semantic-ui-react';


function mapStateToProps(state) {
    return { data: state.counties };
}

class CountySelect extends Component {

    render() {

        return (
            <div class="county-select-div">
                    <div>
                        <h2>Select the county in Wisconsin which you reside in:</h2>
                    </div>
                    <CountySelector />



                <Button primary={true} as={Link} to='/'>Submit</Button>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(CountySelect));