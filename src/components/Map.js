import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const ParkwizMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={props.center}
    defaultZoom={props.zoom} />
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

    return(
      <div style={{width: `750px`, height: `750px`}}>
        <ParkwizMap
          center={{
            lat: lat,
            lng: lng
          }}
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
