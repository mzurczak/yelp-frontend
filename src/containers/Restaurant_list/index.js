import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import { connect } from 'react-redux';

import RestaurantItem from '../Restaurant_item'

const styles = {
  table: {
    width: '80%',
    margin: '20px auto 0',
  },
};

class RestaurantList extends Component {
  
  state = {
    showCheckboxes: false,
  };

  render() {
    return (
      <div>
        <Table
        style={styles.table}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableHeaderColumn >Name</TableHeaderColumn>
              <TableHeaderColumn >Address</TableHeaderColumn>
              <TableHeaderColumn >Phone</TableHeaderColumn>
              <TableHeaderColumn >Website</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              Object.values(this.props.restaurants).map( 
                (restaurant, index) => (
                  <RestaurantItem key={index} restaurant={restaurant} />))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ restaurantReducer }, props) => {
  return ({
    restaurants: restaurantReducer.restaurants
  })
}

export default connect(mapStateToProps)(RestaurantList);