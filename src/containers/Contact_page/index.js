import React, {Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

import './index.css'
import Header from '../../containers/Header'
import { fetchContactForm } from '../../store/actions'

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginTop: '10px'
  },
  
  linkedButton: {
    padding: '0px',
    fontSize: '15px'
  },
}

class Contact extends Component {

  constructor () {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
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
  
  handleMessageChange = (e) => {
    this.setState({
      request: e.currentTarget.value,
    });
  }

  handleContactForm = (e) => {
    e.preventDefault();
    const contactForm = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      request: this.state.request
    }
    this.props.dispatch(fetchContactForm(contactForm));
    this.props.history.push("/")
  }

  validateEmail = () => {
    const email = this.state.email;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render(){
    console.log(this.props.match)
    const activeButton = (
      <FlatButton 
      label="Send contact form!"  
      style = { styles.activeButton }
      onClick = { this.handleContactForm }
    />)
  
    const inactiveButton = (
      <FlatButton 
      label=" "  
      disabled={true}
    />)
  
    const renderButton = (this.state.request && (this.validateEmail())) ? activeButton : inactiveButton;

    return(
      <div>
        <Header />
        <div className = 'Contact-body'>
          <h2>We would love to hear from you!</h2>
            <form>
              <TextField
                fullWidth = {true}
                floatingLabelText = "First name"
                onChange={ this.handleFirstNameChange }
              /><br />
              <TextField
                fullWidth = {true}           
                floatingLabelText = "Last name"
                onChange={ this.handleLastNameChange }
              /><br />
              <TextField
                fullWidth = {true}
                hintText = "example@example.com"
                floatingLabelText = "Email"
                onChange={ this.handleEmailChange }
              /><br />
              <TextField
                fullWidth = {true}
                hintText = "Your message"
                multiLine = { true }
                floatingLabelText = "Your message"
                onChange={ this.handleMessageChange }
              /><br />
              { renderButton }
              <br />
            </form>
        </div>
      </div>
    )
  }
}
export default connect()(withRouter(Contact)) 
