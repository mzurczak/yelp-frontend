import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TableRow, TableRowColumn } from 'material-ui/Table';

class RestaurantItem extends Component {

  render () {
    return(
      <TableRow >
        <TableRowColumn>
          <Link to = { `/restaurants/${ this.props.restaurant.id}` } >
           {this.props.restaurant.name}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{this.props.restaurant.address}</TableRowColumn>
        <TableRowColumn>{this.props.restaurant.phone}</TableRowColumn>
        <TableRowColumn>
          <a
            href = { `${this.props.restaurant.url }`}
          >{ this.props.restaurant.url }</a>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default connect()(withRouter(RestaurantItem))