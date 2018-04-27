import React, { Component } from 'react';
import PropTypes from "prop-types";
import geolib from 'geolib';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import {Button} from 'semantic-ui-react';

function mapStateToProps(state) {
    return { data: state.agencies };
}

export class AgencyMap extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
        selectedLat: 0.0,
        selectedLon: 0.0
    };

    style = {
        width: '60%',
        height: '60%'
    }
  
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
          selectedLat: props.position.lat,
          selectedLon: props.position.lng
      });
  
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };

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

        var geoCenter = geolib.getCenter(locations);
        var center = {lat: 0, lng: 0};
        center.lat = parseFloat(geoCenter.latitude);
        center.lng = parseFloat(geoCenter.longitude);
        return center;
    }
  
    render() {
      return (
        <Map google={this.props.google}
            onClick={this.onMapClicked}
            initialCenter={this.calculateCenter(this.props.agencies)}
            style={this.style}
            zoom={12}
        >
            
            {this.props.agencies.map(agency => {
                if(agency.lat) {
                        return (this.props.isMarkerShown && 
                            <Marker 
                                position={{lat: agency.lat, lng: agency.lon}} 
                                key={agency.name}
                                onClick={this.onMarkerClick}
                                name={agency.name}
                            />
                        );
                    }
                })}
          
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h5>{this.state.selectedPlace.name}</h5>
                  <div className='agency-map-div'>
                    <Button size={'tiny'} primary={true} href={`http://www.google.com/maps/search/?api=1&query=${this.state.selectedLat},${this.state.selectedLon}`}>Get Directions</Button>
                  </div>
              </div>
          </InfoWindow>
        </Map>
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

export default withRouter(connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: ("AIzaSyDsT5bprWJB-h2ztvVUXRRSPHJGKnZtCvo")
  })(AgencyMap))); 