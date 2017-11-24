import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';

// import FlatButton from 'material-ui/FlatButton'
import { Rating } from 'material-ui-rating';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Remove from 'material-ui/svg-icons/action/delete';

import { fetchUser, fetchRestaurantList, fetchDeleteReview } from '../../store/actions';

import './index.css'

// const styles = {
//   activeButton: {
//     backgroundColor: 'rgb(33, 150, 243)',
//     marginBottom: '10px',
//     marginLeft: '55px'
//   },
// }

class ReviewItem extends Component {

  componentDidMount(){
    this.props.dispatch(fetchUser());
  }

  handleEditReview = () => {
    console.log('clicked')
  }

  handleDelete = () => {
    const restaurantId = this.props.match.params.restaurantId;
    const reviewId = this.props.review.id;
    this.props.dispatch(fetchDeleteReview(restaurantId, reviewId))
      .then(this.props.dispatch(fetchRestaurantList()))
  }

  calcAge = (created) => {
    var newDate = created.slice(0, 3).join("-").concat('T');
    newDate = newDate.concat(created.slice(3, 5).join(":"));
    let moment = new Moment(newDate);
    let age = moment.toNow(true);
    return age;
  }

  render(){

    const deleteButton = (<Remove 
      onClick = { this.handleDelete } />)

    const renderDelete = () => (this.props.review.user.id === this.props.user.id ? deleteButton : null) ;

    return(
      <div>
        <div className = "Rate">
          <Rating
            value = { this.props.review.rating }
            readOnly = { true }
            max = { 5 }
          />
          { /*renderDelete() */}
        </div>
      <ListItem
        primaryText =  { 
        `${this.props.review.user.firstName} 
        ${this.props.review.user.lastName} `
        
        }
        secondaryText = {
        `${ this.calcAge(this.props.review.dateCreated) } ago`
        }
      />
      <ListItem
        primaryText = {this.props.review.text}
      />
      <Divider />  
      </div>        
    )
  }
}

const mapStateToProps = ( {userReducer} ) => {
  return({
    user: userReducer.userInfo
  })
}
export default connect()(withRouter(ReviewItem));