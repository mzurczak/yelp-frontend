import React from 'react';

import Header from '../../containers/Header'
import RestaurantList from '../../containers/Restaurant_list';
import WelcomeContainer from '../Welcome_container';

export default () => (
  <div>
    <Header />
    {console.log(this.props)}
    <h2>Search results: </h2>
    <RestaurantList />
  </div>
)
