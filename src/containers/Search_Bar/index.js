import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

import { fetchSearching } from '../../store/actions';

const styles = { 
  searchBar : {
    display: 'inline'
  },

  searchButton: {
    backgroundColor: '#F8F8FF',
    marginRight: '20px',
    margin: 'auto',
    height: '36px',
    borderRadius: '5px',
    paddingBottom: '3px',
    position: 'relative'
  },

  searchBox: {
    backgroundColor: '#F8F8FF',
    borderRadius: '5px',
    marginRight: '5px',
    height: '36px',
  },
}

class SearchBar extends Component {

  constructor(){
    super();

    this.state = {
      searchItem: ''
    }
  }

  handleChangeSearchItem = (e) => {
    this.setState({
      searchItem: e.currentTarget.value
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const searchItem = this.state.searchItem;
    this.props.dispatch(fetchSearching(searchItem))
      // .then(() => this.props.history.push(`/restaurants/search?query=${searchItem}`));
  }

  render(){
    return(
      <span >
        <form 
        style={styles.searchBar}
        onSubmit = { this.handleSearch }>
          <TextField 
            id = "search-text-field"
            style = { styles.searchBox } 
            underlineShow = {false}
            onChange = { this.handleChangeSearchItem }
            inputStyle = {
              { fontSize: '15px', 
                marginLeft: '10px',
                fontWeight: '200',
              }
            }/>
          <FlatButton 
            style = { styles.searchButton } 
            onClick = { this.handleSearch }
            label = "Search" />
        </form>
      </span>
    )
  }
}

export default connect()(withRouter(SearchBar))