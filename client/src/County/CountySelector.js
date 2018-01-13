import React from 'react';
import PropTypes from 'prop-types';
import Client from '../Client';

class CountySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requestFailed: false,
            counties: [],
        };
    }

    componentDidMount() {
        Client.getCounties()
            .then((d) => {
                this.setState({
                    counties: d.counties,
                });
            }, () => {
                this.setState({
                    requestFailed: true,
                });
            });
    }

    handleCountyChosen = e => {
        this.setState({ chosenCounty: e.target.value });
        this.props.handleCountyChange(e.target.value);
    };

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
            <div className="Search">
                {
                    <select onChange={this.handleCountyChosen}>{this.state.counties.map((county, i) =>
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