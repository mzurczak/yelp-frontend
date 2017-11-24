import React, { Component } from 'react';
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom'

import './index.css';
import { logOut } from '../../store/actions';
import SearchBar from '../Search_Bar';


const styles = {
  FlatButton: {
    color: 'white',
    marginRight: '20px',
  },
}

class Header extends Component {

  handleHomePage = () => {
    // this.props.dispatch(fetchRestaurantList())
    // .then(()=>{
      this.props.history.push('/');
    // })
  }
  
  handleAboutPage = () => {
    this.props.history.push('/about');
  }

  handleContactPage = () => {
    this.props.history.push('/contact');
  }
  
  handleSignUpPage = () => {
    this.props.history.push('/users/sign_up');
  }

  handleSignInPage = () => {
    this.props.history.push('/users/sign_in');
  }

  handleEdit = () => {
    this.props.history.push('/users/edit');
  }

  handleLogOut = () => {
    localStorage.clear();
    const action = logOut();
    this.props.dispatch(action);
    this.props.history.push('/');
  }

  handleSearch = (e) => {
    e.preventDefault();
  }

  render (){
    const unloggedUser = (
      <div>
        <FlatButton 
          style = { styles.FlatButton } 
          label = "Sign Up" 
          onClick = { this.handleSignUpPage }/>
        <FlatButton 
          style = { styles.FlatButton } 
          label = "Sign In"
          onClick = { this.handleSignInPage }/>
      </div>
    )

    const loggedUser = (
      <div>
        <FlatButton 
        style = { styles.FlatButton } 
        label = "Edit" 
        onClick = { this.handleEdit }/>
        <FlatButton 
        style = { styles.FlatButton } 
        label = "Log out" 
        onClick = { this.handleLogOut }/>
      </div>
    )
  

    const renderButton = () => localStorage.getItem('token') ? loggedUser : unloggedUser;
    
    return (
      <div className = 'Header' >
        <div id = 'leftSide'>
            <h2 id = 'logo' onClick = { this.handleHomePage } >Yelpdemo</h2>
            <FlatButton 
              style = { styles.FlatButton } 
              label = "About" 
              onClick = { this.handleAboutPage }/>
            <FlatButton 
              style = { styles.FlatButton } 
              label = "Contact" 
              onClick = { this.handleContactPage }/>
            <SearchBar />
        </div>
        <div id = 'rightSide'>
          {renderButton()}
        </div>
      </div>
   )
  }
}

const mapStateToProps = ({userReducer}) => {
  return ({
    token: userReducer.token
  })
}
export default connect(mapStateToProps)(withRouter(Header))