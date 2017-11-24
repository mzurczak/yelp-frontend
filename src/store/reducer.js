import { combineReducers } from 'redux'

const userInitialState = {
  token: '',
}

const userReducer = (state=userInitialState, action) => {
  switch (action.type) {
    case 'addUser':{
      console.log(action)
      return {
        token: action.token,
        userInfo: action.user
      }
    }
    
    case 'logOutUser': {
      return {
        token:'',
      }
    }

    case 'addToken': {
      return {
        token: action.token,
      };
    }

    default:
      return state;
  }
}

const restaurantInitialState = {
  restaurants: {
    initial: 'initial'
  }
}

const restaurantReducer = (state = restaurantInitialState, action) => {

  switch ( action.type ) {
    case 'addRestaurants' :{
      return {
        restaurants: action.data
      }
    }
    default :{
      return state;
    }
  }
}

const coordinatesInitialState = {
  coordinates: {
    lat: 0,
    lng: 0
  }
}

const coordinatesReducer = (state = coordinatesInitialState, action) => {
  
  switch ( action.type ) {
    case 'addCoordinates' :{
      return {
        coordinates: action.coordinates
      }
    }
    default :{
      return state;
    }
  }
}

const yelpReducer = combineReducers({
  restaurantReducer: restaurantReducer,
  userReducer: userReducer,
  coordinatesReducer: coordinatesReducer
})

export default yelpReducer;