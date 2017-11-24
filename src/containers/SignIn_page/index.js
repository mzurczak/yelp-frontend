import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import './index.css';
import Header from '../Header';
import { fetchSignIn } from '../../store/actions';
import { Link } from 'react-router-dom';

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginTop: '20px'
  },

  linkedButton: {
    padding: '0px',
    fontSize: '15px'
  },
  
}

class SignInPage extends Component {
  
  constructor () {
    super();

    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.currentTarget.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.currentTarget.value,
    })
  }

  handleSignIn = () => {
    const email = this.state.email;
    const password = this.state.password;
    
    this.props.dispatch(fetchSignIn(email, password))
      .then(() => {
        this.setState({
          email: '',
          password: ''
        })
        if (!localStorage.getItem('token')){
          alert('Invalid email or password');
          this.props.history.push("/users/sign_in")
        } else {
          this.props.history.push("/")
        }
      });
  }
  
  render() {

    const activeButton = (
      <FlatButton 
      label="Sign in"  
      style = { styles.activeButton }
      onClick = { this.handleSignIn }
    />)
  
    const inactiveButton = (
      <FlatButton 
      label="Sign in"  
      disabled={true}
    />)
  
    const renderButton = ((this.state.password !== '')) ? activeButton : inactiveButton;

    return (
      <div>
        <Header />
        <div className = 'Body'>
          <h2>Sign in</h2>
            <form>
              <TextField
                floatingLabelText = "Email"
                onChange={ this.handleEmailChange }
              /><br />
              <TextField
                floatingLabelText = "Password"
                type = "password"
                onChange={ this.handlePasswordChange }
              /><br />
              { renderButton }
              <br />
              <p><Link 
                to = "/users/sign_up" 
                style = { styles.linkedButton } 
              >SignUp</ Link> </p>
              <p><Link 
                to = "/users/forgot_password" 
                style = { styles.linkedButton } 
              >Forgot your password?</ Link> </p>
            </form>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(SignInPage))