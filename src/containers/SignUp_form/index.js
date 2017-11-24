import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

import { fetchNewUser, fetchSignIn, fetchUser } from '../../store/actions';

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginTop: '10px'
  },
}

class SignUpForm extends Component {
  
  constructor () {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmed: false,
    }
  }

  handleFirstNameChange = (e) => {
    this.setState({
      firstName: e.currentTarget.value,
    })
  }

  handleLastNameChange = (e) => {
    this.setState({
      lastName: e.currentTarget.value,
    })
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

  handlePasswordConfirmation = (e) => {
    e.preventDefault();
    this.setState({
      passwordConfirmed: (this.state.password === e.currentTarget.value)
    }) 
  }
  
  handleSignUp = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    this.props.dispatch(fetchNewUser(newUser))
      .then(() => {
        this.props.history.push("/")
      })
      .then(() => this.props.dispatch(fetchSignIn(newUser.email, newUser.password)))
      .then (this.props.dispatch(fetchUser()));
  }
  
  render() {
  
    const activeButton = (
      <FlatButton 
      label="Sign up"  
      style = { styles.activeButton }
      onClick = { this.handleSignUp }
    />)
  
    const inactiveButton = (
      <FlatButton 
      label="Sign up"  
      disabled={true}
    />)
  
    const renderButton = (this.state.passwordConfirmed) ? activeButton : inactiveButton;

    return (
      <div>
        <form>
          <TextField
            hintText = "First name"
            floatingLabelText = "First name"
            onChange={ this.handleFirstNameChange }
          /><br />
          <TextField
            hintText = "Last name"
            floatingLabelText = "Last name"
            onChange={ this.handleLastNameChange }
          /><br />
          <TextField
            hintText = "example@example.com"
            floatingLabelText = "Email"
            onChange={ this.handleEmailChange }
          /><br />
          <TextField
            hintText = "Password"
            floatingLabelText = "Password"
            type = "password"
            onChange={ this.handlePasswordChange }
          /><br />
          <TextField
            hintText = "Confirm password"
            floatingLabelText = "Confirm password"
            type = "password"
            onChange={ this.handlePasswordConfirmation }
          /><br />
          { renderButton }
        </form>
      </div>
    )
  }
}

export default connect()(withRouter(SignUpForm))