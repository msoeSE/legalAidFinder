import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import geolib from 'geolib';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';

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

function mapStateToProps(state) {
    return { data: state.agencies };
}

class AgencyMap extends Component {


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

    componentWillMount() {
    }

    render() {
        if (!this.props.agencies) {
            return (<div className='ui segment'>
                <p>Loading</p>
                <div className='ui active dimmer'>
                    <div className='ui loader' />
                </div>
            </div>);
        }

        return(
            <div style={{margin: '10px'}}>
                <MapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsT5bprWJB-h2ztvVUXRRSPHJGKnZtCvo"
                    loadingElement={<div style={{height: '100%'}}/>}
                    containerElement={<div style={{height: '80%', width: '80%', position: 'absolute'}}/>}
                    mapElement={<div style={{height: '100%'}}/>}
                    agencies={this.props.agencies}
                    center={this.calculateCenter(this.props.agencies)}
                />
            </div>
        )

    }
}

AgencyMap.propTypes = {
    agencies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string,
        lat: PropTypes.number,
        lon: PropTypes.number,
        _id: PropTypes.string.isRequired,
    })),
    isMarkerShown: PropTypes.bool
};

export default withRouter(connect(mapStateToProps)(AgencyMap));



