import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../containers/Header';
import RestaurantCard from '../../RestaurantCard';
import ReviewList from '../../components/ReviewList';

import './index.css';

import { fetchRestaurantList } from '../../store/actions'

class RestaurantPage extends Component {

  render(){
    const {restaurantItem, reviews} = this.props
    return (
      <div >
        <Header />
        <div className = "RestaurantPage-Body">
          <RestaurantCard data = { restaurantItem } id = { restaurantItem.id }/>
          <ReviewList data = { reviews }/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ restaurantReducer }, props) => {
  const restaurantId = props.match.params.restaurantId;
  const restaurantItem = {...restaurantReducer.restaurants[restaurantId]};
  
  const reviews = restaurantItem.reviews;
  return ({
    restaurantItem,
    reviews
  });
}
export default connect(mapStateToProps)(RestaurantPage);