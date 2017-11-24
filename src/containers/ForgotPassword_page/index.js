import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import Header from '../Header';
import { fetchResetPassword } from '../../store/actions';
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

class ForgotPasswordPage extends Component {
  
  constructor (props) {
    super(props);

    this.state = {
      email: '',
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.currentTarget.value,
    });
  }

  handleResetPassword = (e) => {
    e.preventDefault();
    const email = this.state.email;
    if (email.includes('@')){
      this.props.dispatch(fetchResetPassword(email));
      this.setState({
        email: '',
      });
      alert('Check your email for further informtion!')
      this.props.history.push("/")
    } else {
      alert('Incorect email addres!');

    }
  }
  
  render() {

    const activeButton = (
      <FlatButton 
      label="Send me reset password instructions"  
      style = { styles.activeButton }
      onClick = { this.handleResetPassword }
    />)
  
    const inactiveButton = (
      <FlatButton 
      label=""  
      disabled={true}
    />)
  
    const renderButton = ((this.state.email !== '')) ? activeButton : inactiveButton;

    return (
      <div>
        <Header />
        <div className = 'Body'>
          <h2>Forgot your password?</h2>
            <form onSubmit = { this.handleResetPassword }>
              <TextField
                hintText = "example@example.com"
                floatingLabelText = "Email"
                onChange={ this.handleEmailChange }
              /><br />
              { renderButton }
              <br />
              <p><Link 
                to = "/users/sign_up" 
                style = { styles.linkedButton } 
                >Sign in</ Link> </p>
              <p><Link 
                to = "/users/sign_in" 
                style = { styles.linkedButton } 
                >Sign up</ Link> </p>
            </form>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(ForgotPasswordPage))