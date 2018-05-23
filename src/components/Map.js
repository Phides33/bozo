import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { PlaceMarker } from './PlaceMarker';

const ParkwizMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={props.center}
    defaultZoom={props.zoom}>
    {props.places}
  </GoogleMap>
));

export class Map extends Component {
  constructor(props) {
    super(props)

    this.zoom = 16

    this.state = {
      lat: 44.8472302,
      lng: -0.5775494
    };
  }

  render() {
    const {lat, lng} = this.state;
    const places = [<PlaceMarker lat={lat} lng={lng} price={20} />];

    return(
      <div style={{width: `500px`, height: `750px`}}>
        <ParkwizMap
          center={{
            lat: lat,
            lng: lng
          }}
          places={places}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </div>
    );
  }
}

export default Map
