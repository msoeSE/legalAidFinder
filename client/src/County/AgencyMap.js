import React, { Component } from 'react';
import PropTypes from "prop-types";
import CountySelector from './CountySelector';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import geolib from 'geolib';

class AgencyMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestFailed: false,
            counties: [],
            center: {lat: 0, lng: 0}
        };
    }

    calculateCenter(agencies){
        var i = 0;
        var locations = [];

        agencies.forEach(function(agency){
            if(agency.lat) {
                var location = {lat: agency.lat, lng: agency.lon};
                locations[i] = location;
                i++;
            }
        });

       // console.log(locations);

        var geoCenter = geolib.getCenter(locations);
        var center = {lat: 0, lng: 0};
        center.lat = parseFloat(geoCenter.latitude);
        center.lng = parseFloat(geoCenter.longitude);
        return center;
    }

    componentDidMount() {
        this.state.center = this.calculateCenter(this.props.agencies);
    }

    render() {
        return (
            <div>
                <GoogleMap
                    defaultZoom={12}
                    defaultCenter={this.state.center}
                >
                    {this.props.agencies.map(agency => {
                        if (agency.lat) {
                            return (this.props.isMarkerShown &&
                                <Marker position={{lat: agency.lat, lng: agency.lon}} label={agency.name}/>
                            );
                        }
                    })}
                </GoogleMap>
            </div>
        );
    }
}

CountySelector.propTypes = {
    agencies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        lat: PropTypes.number,
        lon: PropTypes.number,
        _id: PropTypes.string.isRequired,
    })),
    isMarkerShown: PropTypes.bool
};

export default AgencyMap;



