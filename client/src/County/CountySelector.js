import React from 'react';
import PropTypes from 'prop-types';
import Client from "../Client";
import { fetchCounties } from '../actions/countiesActions';
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
        this.props.handleCountyChange(e.target.value);
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

CountySelector.propTypes = {
    counties: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        state: PropTypes.string,
        _id: PropTypes.string.isRequired,
    })),
    handleCountyChange: PropTypes.func
};

export default withRouter(connect(mapStateToProps)(CountySelector));