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
        <PlaceMarker key={`place${place.id}`}
                     id={place.id}
                     lat={place.lat}
                     lng={place.lng}
                     description={"repéré par user" + place.user_id}
                     name={place.direction + "degrees"}
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

    this.userSet = false

    this.device_id = "852b50777ced0b51c3853a443016774a"

    this.state = {
      places: [],
      userLat : null,
      userLng : null,
      user: [],
      lat: 44.847352,
      lng: -0.5774067
    };
  }

  // calls the 3 functions
  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
    this.fetchUserFromApi()
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
    if (this.userSet)
      return
      this.setState({userLat: this.map.getCenter().lat(), userLng: this.map.getCenter().lng() })
      this.userSet = true
  }

  // get markers from API
  fetchPlacesFromApi() {
    this.setState({ places: [] })

    fetch(`/api/v1/spottings?min_lng=${this.xMapBounds.min}&max_lng=${this.xMapBounds.max}&min_lat=${this.yMapBounds.min}&max_lat=${this.yMapBounds.max}`,
      { method: 'GET' })
      .then((response) => response.json())
      .then((response) => this.setState({ places: response }))
  }

  // get user info from API
  fetchUserFromApi() {
    this.setState({ user: [] })

    fetch(`/api/v1/users?device_id=${this.device_id}`,
      { method: 'GET' })
      .then((response) => response.json())
      .then((response) => this.setState({ user: response.user }))
  }

  // gets and sets map boundaries
  getMapBounds() {
    var mapBounds = this.map.getBounds()
    var xMapBounds = mapBounds.b
    var yMapBounds = mapBounds.f

    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f

    // Corrected against tuto as for negative coords max min need to be inverted
    this.yMapBounds.max = yMapBounds.f
    this.yMapBounds.min = yMapBounds.b
  }

  render() {
    const {lat, lng, userLat, userLng, user, places} = this.state;

    return(
      <div style={{width: `350px`, height: `600px`}}>
        <ul>
          <li>lng: {lng}</li>
          <li>lat: {lat}</li>
          <li>User lng: {userLng}</li>
          <li>User lat: {userLat}</li>
          <li>User details: {user}</li>
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
