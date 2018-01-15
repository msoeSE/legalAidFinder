import React, { Component } from 'react';
import PropTypes from "prop-types";
import CountySelector from './CountySelector';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import geolib from 'geolib';
import Client from "../Client";

const MapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={11}
        defaultCenter={props.center}
    >
        {props.agencies.map(agency => {
            if(agency.lat) {
                return (props.isMarkerShown && <Marker position={{lat: agency.lat, lng: agency.lon}} label={agency.name}/>
                );
            }
        })}
    </GoogleMap>
));

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
        Client.getAgencies()
            .then((d) => {
                this.setState({
                    agencies: d.agencies,
                });
            }, () => {
                this.setState({
                    requestFailed: true,
                });
            });
    }

    render() {
        if (!this.state.agencies) {
            return (<div className='ui segment'>
                <p>Loading</p>
                <div className='ui active dimmer'>
                    <div className='ui loader' />
                </div>
            </div>);
        }

        return(
            <div>
                <MapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsT5bprWJB-h2ztvVUXRRSPHJGKnZtCvo"
                    loadingElement={<div style={{height: '100%'}}/>}
                    containerElement={<div style={{height: '400px'}}/>}
                    mapElement={<div style={{height: '100%'}}/>}
                    agencies={this.state.agencies}
                    center={this.calculateCenter(this.state.agencies)}
                />
            </div>
        )

    }
}

AgencyMap.propTypes = {
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



