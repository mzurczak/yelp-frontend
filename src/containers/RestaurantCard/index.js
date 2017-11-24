import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CommunicationCall from 'material-ui/svg-icons/communication/call';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Map from '../MapContainer';
import { Rating } from 'material-ui-rating';
import Room from 'material-ui/svg-icons/action/room';
import Website from 'material-ui/svg-icons/action/http';

import './index.css'

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginBottom: '10px',
    marginLeft: '55px'
  },
}

class RestaurantCard extends Component {

  handleNewReview = () => {
    this.props.history.push(`/restaurants/${this.props.id}/reviews/new`)
  }

  calculateRating = (reviews) => {
    var sum = 0;
    if(reviews === undefined) {
      return (
        <Rating
        value = { 0 }
        readOnly = { true }
        max = { 5 } />)
    } else {
      reviews.forEach((review) => {
        sum += review.rating;
      })
      const rate = sum / reviews.length;
      return (
        <Rating
        value = { rate }
        readOnly 
        max = { 5 }/>
      )
    }
  }

  render(){

    const renderReviewButton = () => {
      if (localStorage.getItem('token')){
        return <FlatButton 
          label="Write a Review"  
          style = { styles.activeButton }
          onClick = { this.handleNewReview }
        />
      }
    }
    return(
      <div className = "RestaurantCard">
        <img   src = {this.props.data.logo} width='100%' alt = 'logo' />
        { this.calculateRating(this.props.data.reviews) }
        <List>
          <ListItem
            leftIcon = { <Room /> }
            primaryText = { this.props.data.address}
          />
          <ListItem
            leftIcon = { <CommunicationCall /> }
            primaryText = { this.props.data.phone }
          />
          <ListItem
            leftIcon = { <Website /> }
            primaryText = { <a href={`${this.props.data.url}`}>
              Go to Homepage</a> }
          />
        </List>
        { renderReviewButton() } 
        <Map address = { this.props.data.address} /> 
      </div>
    )
  }
}

export default connect()(withRouter(RestaurantCard))