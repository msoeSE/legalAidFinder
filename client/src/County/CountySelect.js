import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class CountySelectPage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCounties());
    }

    chooseCounty = (county) => {
        this.setState({ chosenCounty: county });
    };

    addSelectedCountyClick() {
        addSelectedCounty(this.props.chosenCounty);
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className={`${styles['county-title']}`}>Select the county in Wisconsin which you reside in:</h2>
                </div>
                <CountySelector counties={this.props.counties} handleCountyChange={this.chooseCounty} />
                {<Link to="/categories/" onClick={this.addSelectedCountyClick}>
                    Submit
                </Link>}
            </div>
        );
    }
}

// Actions required to provide data for this component to render in sever side.
CountySelectPage.need = [() => { return fetchCounties(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        counties: getCounties(state)
    };
}

CountySelectPage.propTypes = {
    counties: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        state: PropTypes.string,
        _id: PropTypes.string.isRequired,
    })).isRequired,
    chosenCounty: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
};

CountySelectPage.contextTypes = {
    router: PropTypes.object,
};

export default connect(mapStateToProps)(CountySelectPage);