import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../Header';
import SignUpForm from '../SignUp_form'

const styles = {
  linkedButton: {
    padding: '0px',
    fontSize: '15px'
  },
}

class SignUpPage extends Component {
   
  render() {
    return (
      <div>
        <Header />
        <div className = 'Body'>
          <h2>Sign up</h2>
            <SignUpForm />
            <p>
              <Link 
                to = "/users/sign_in" 
                style = { styles.linkedButton } 
                >Sign in
              </ Link> 
            </p>
        </div>
      </div>
    )
  }
}

export default connect()(SignUpPage)