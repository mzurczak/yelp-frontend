import React from 'react';

import Header from '../../containers/Header'
import RestaurantList from '../../containers/Restaurant_list';
import WelcomeBox from '../Welcome_box';

export default () => (
  <div>
    <Header />
    <WelcomeBox />
    <RestaurantList />
  </div>
)
