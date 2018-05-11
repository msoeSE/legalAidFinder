import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MagnifyLoader from '../../Helpers/MagnifyLoader';
import {fetchTitleAndDescription} from "../../Actions/homePageActions";
import HomePageForm from "./HomePageForm";

function mapStateToProps(state) {
    return { data: state.homePage };
}

class HomePageTab extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div>
                <HomePageForm/>
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps)(HomePageTab));
