import React from 'react';
import { fetchCounties, chooseCounty } from '../actions/countiesActions';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return { data: state.counties };
}

class CountySelector extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchCounties());
    }

    handleCountyChosen = e => {
        this.props.dispatch(chooseCounty(e.target.value));
    };

    render() {
        return (
            <div className="Search">
                {
                    <select onChange={this.handleCountyChosen}>{this.props.data.counties.map((county, i) =>
                        <option key={i}>
                            {county.name}
                        </option>)}
                    </select>
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(CountySelector));