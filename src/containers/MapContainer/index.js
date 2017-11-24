import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map as ExampleMap, Marker, GoogleApiWrapper} from 'google-maps-react';
import Map from '../../components/Map'
import './index.css'

import { fetchCoordinates } from '../../store/actions'

const style = {
  width: '19%',
  height: '200px',
}
class MapContainer extends Component {

  
  render() {

    if (!this.props.loaded) {
      return <div>Loading...</div>
    };

    return (
      <div className = "Map">
        <ExampleMap 
          address = { this.props.address }
          style = { style }
          google={ this.props.google } >
            <Marker />
        </ ExampleMap>
      </div>
    )
  }
}

export default connect()(GoogleApiWrapper({
  apiKey: "AIzaSyAtZmX6xZzKxK8oYR1LyJT8CexxG4-m0sA"
})(MapContainer))
