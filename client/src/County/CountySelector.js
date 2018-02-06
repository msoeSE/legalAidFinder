import React from 'react';
import { fetchCounties, chooseCounty } from '../Actions/countiesActions';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return { data: state.counties };
}

class CountySelector extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchCounties());
        this.props.dispatch(chooseCounty("Adams")); // To get around event not firing until first selection.
                                                    // Need to actually get first county in array.
    }

    handleCountyChosen = e => {
        this.props.dispatch(chooseCounty(e.target.value));
    };

    render() {
        return (
            <div>
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
