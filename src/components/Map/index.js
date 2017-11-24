import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import './index.css';

import { fetchCoordinates } from '../../store/actions'

class Map extends Component {

  componentDidUpdate(prevProps, prevState) {
    this.props.dispatch(fetchCoordinates(this.props.address));
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let zoom = 14;
      let lat = this.props.coordinates.lat;
      let lng = this.props.coordinates.lng;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.props.coordinates
      });
    })
  }

  render() {
    console.log(this.props.address)
    return(
      <div refs='map'>
        Loading map...
        {this.renderChildren()}
      </div>
    )
  }
}

const mapStateToProps = ( { coordinatesReducer } ) => {
  return({
    coordinates: coordinatesReducer.coordinates
  })
}

export default connect(mapStateToProps)(Map)