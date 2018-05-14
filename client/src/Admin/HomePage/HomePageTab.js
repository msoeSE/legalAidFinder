import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
