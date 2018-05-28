import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { PlaceMarker } from './PlaceMarker';

const ParkwizMap = withGoogleMap(props => (
  <GoogleMap
    // argument passed as ref to store map object
    ref={props.onMapMounted}
    // run functions on Google Maps API events
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom}>
    {
      props.places.length > 0 && props.places.map(place => (
        <PlaceMarker lat={44.8472302}
                     lng={-0.5775494}
                     description={'Renault Clio immat BW-941-ZZ'}
                     name={'Voiture'}
                     price={'10'} />
      ))
    }
  </GoogleMap>
));

export class Map extends Component {
  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 16

    this.state = {
      places: [],
      lat: 44.8472302,
      lng: -0.5775494
    };
  }

  // calls the 3 functions
  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  // assigns a map object to this.map once map is loaded
  handleMapMounted(map) {
    this.map = map
  }

  // detects full map loading and gets latest data
  handleMapFullyLoaded() {
    if (this.mapFullyLoaded)
      return

    this.mapFullyLoaded = true
    this.handleMapChanged()
  }

  // gets and sets map center point
  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  // get markers from API
  fetchPlacesFromApi() {
    const place = <PlaceMarker lat={44.8472302} lng={-0.5775494} price={20} name={"Voiture"} description={"Renault Clio immat BW-941-ZZ"} />
    this.setState({ places: [place] })
  }

  // gets and sets map boundaries
  getMapBounds() {
    var mapBounds = this.map.getBounds()
    var xMapBounds = mapBounds.b
    var yMapBounds = mapBounds.f

    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f

    this.yMapBounds.min = yMapBounds.f
    this.yMapBounds.max = yMapBounds.b
  }

  render() {
    const {lat, lng, places} = this.state;

    return(
      <div style={{width: `750px`, height: `750px`}}>
        <ul>
          <li>lng: {lng}</li>
          <li>lat: {lat}</li>
          <li>xMapBounds.min: {this.xMapBounds.min}</li>
          <li>xMapBounds.max: {this.xMapBounds.max}</li>
          <li>yMapBounds.min: {this.yMapBounds.min}</li>
          <li>yMapBounds.max: {this.yMapBounds.max}</li>
        </ul>
        <ParkwizMap
          onMapMounted={this.handleMapMounted.bind(this)}
          handleMapChanged={this.handleMapChanged.bind(this)}
          handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
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
