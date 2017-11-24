import React, { Component } from 'react';

import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';


import './index.css'
import ReviewItem from '../../containers/ReviewItem'

class ReviewList extends Component {

  render(){
    
    return(
      <div className="ReviewList"> 
        <h2>Reviews</h2>
        <List>
          <Divider />
        {
          (this.props.data === undefined) ? "" :
          this.props.data.map( (review, index) => {
            return <ReviewItem key = { index } review = { review }/>
          })
        }
        </List>
      </div>
    )
  }
}

export default ReviewList;