import React from 'react';
import PropTypes from 'prop-types';

class CountySelector extends React.Component {

    handleCountyChosen = e => {
        this.setState({ chosenCounty: e.target.value });
        this.props.handleCountyChange(e.target.value);
    };

    render() {
        return (
            <div className="Search">
                {
                    <select onChange={this.handleCountyChosen}>{this.props.counties.map((county, i) =>
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
    })).isRequired,
    chosenCounty: PropTypes.shape({
        name: PropTypes.string.isRequired,
        state: PropTypes.string,
        _id: PropTypes.string.isRequired,
    }),
    handleCountyChange: PropTypes.func.isRequired
};

export default CountySelector;