import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import AboutPage from './components/About_page';
import ContactPage from './containers/Contact_page';
import EditPage from './containers/EditUser_page';
import ForgotPasswordPage from './containers/ForgotPassword_page';
import Home from './components/Home_page';
import RestaurantPage from './components/Restaurant_page';
import NewReviewPage from './containers/NewReview_page';
import SignInPage from './containers/SignIn_page';
import SignUpPage from './containers/SignUp_page';
import SearchPage from './components/Search_page';
import Store from './store';

import { fetchRestaurantList, addToken } from './store/actions';

Store.dispatch(fetchRestaurantList());
Store.dispatch(addToken());

ReactDOM.render(
  <Provider store = { Store }>
    <MuiThemeProvider>
      <Router>
        <Switch>
          <Route exact path = {'/'} component = { Home } />
          <Route exact path = {'/contact'} component = { ContactPage } />
          <Route exact path = {'/about'} component = { AboutPage } />
          <Route exact path = {'/users/sign_up'} component = { SignUpPage } />
          <Route exact path = {'/users/sign_in'} component = { SignInPage } />
          <Route exact path = {'/users/edit'} component = { EditPage } />
          <Route exact path = {'/users/forgot_password'} component = { ForgotPasswordPage } />
          <Route exact path = {'/restaurants/:restaurantId'} component = { RestaurantPage } />
          <Route exact path = {'/restaurants/:restaurantId/reviews/new'} component = { NewReviewPage } />
          <Route exact path = {`/restaurants/search?query=:searchPhrase`} component = { SearchPage } />
        </Switch>
      </Router >
    </MuiThemeProvider> 
  </Provider>,
  document.getElementById('root'));

  registerServiceWorker();
