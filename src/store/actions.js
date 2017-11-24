/****************************
 * 
 * Actions creators
 * 
/****************************/

export const addToken = () => ({
  type: 'addToken',
  token: localStorage.getItem('token'),
})

export const addUser = (data) => ({
  type: 'addUser',
  token: localStorage.getItem('token'),
  user: data
})

export const logOut = () => ({
  type: 'logOutUser',
  token: ''
})

const addRestaurants = (data) =>( {
  type: 'addRestaurants',
  data: data
})

const addCoordinates = (data) => ({
  type: 'add coordinates',
  coordinates: data
})


/****************************
 * 
 * Fetch functions
 * 
/****************************/

export const fetchSignIn = (email, password) => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  
  const user = {
    email: email,
    password: password
  }
  console.log(user)
  const config = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user)
  }
  
  return fetch('http://localhost:8080/api/users/sign_in', config)
  .then(res => res.json())
  .then(data => {
    if ((data.token !== null )&& (data.token !== undefined)) {
      const action = addToken(data);
      dispatch(action);
      localStorage.setItem('token', JSON.stringify(data.token))
    }
  })       
}

export const fetchNewUser = (user) => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  
  const config = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user)
  }
  console.log(user)
  return fetch('http://localhost:8080/api/users/sign_up', config)
    .then(res => res.json())
    .then(data => {
      if ((data.token !== null )&& (data.token !== undefined)) {
        const action = addToken(data);
        dispatch(action);
        localStorage.setItem('token', JSON.stringify(data.token))
      }});        
}

export const fetchUser = () => (dispatch) => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    });
      
    const config = {
      method: "GET",
      headers: myHeaders,
    }

    return fetch('http://localhost:8080/api/users/me', config)
      .then(res  => res.json())
      .then( data => {
        const action = addUser(data);
        dispatch(action)
      })
  }
}

export const fetchEditUser = (newData, userId) => () => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`,
      // 'Access-Control-Allow-Origin': true,
      // 'Access-Control-Allow-Origin': 'http://localhost:3000',
      // 'Access-Control-Allow-Credentials': true
    });
    
    const config = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(newData)
    }

    return fetch(`http://localhost:8080/api/users/${userId}`, config)
  }
}

export const fetchDeleteUser = ( userId) => () => {
  console.log(userId);
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`,
    });
    
    const config = {
      method: "DELETE",
      headers: myHeaders,
    }

    return fetch(`http://localhost:8080/api/users/${userId}`, config)
  }
}

export const fetchDeleteReview = ( restaurantId, reviewId ) => () => {
  console.log(reviewId);
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`,
    });
    
    const config = {
      method: "DELETE",
      headers: myHeaders,
    }

    return fetch(`http://localhost:8080/api/restaurants/${restaurantId}/review/${reviewId}`, config)
  }
}

export const fetchRestaurantList = () => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  const config = {
    method: "GET",
    headers: myHeaders,
  }

  const url = 'http://localhost:8080/api/restaurants/'
  return fetch(url, config)
    .then(res => res.json())
    .then(data => {
      const restaurants = {};
      data.forEach( restaurant => {
        restaurants[restaurant.id] = restaurant
      });
      dispatch(addRestaurants(restaurants));
  })
}

export const fetchSearching = (searchItem) => (dispatch) => {
  console.log(searchItem);
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  const config = {
    method: "GET",
    headers: myHeaders,
  }

  const url = `http://localhost:8080/api/restaurants/search?q=${searchItem}`
  return fetch(url, config)
    .then(res => res.json())
    .then(data => {
      const restaurants = {};
      data.forEach( restaurant => {
        restaurants[restaurant.id] = restaurant;
      });
      dispatch(addRestaurants(restaurants));
  })
}

export const fetchNewReview = (review) => (dispatch) => {
  const tokenJSON = localStorage.getItem('token');
  const token = JSON.parse(tokenJSON);
  if (token){
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ token }`
    });
    const newReview = {
      text: review.review,
      rating: review.rating
    }
  
    const config = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newReview)
    }
  
    const url = `http://localhost:8080/api/restaurant/${review.restaurantId}/review`
    return fetch(url, config)
    //   .then(res => res.json())
    //   .then(data => {
    //     const restaurants = {};
    //     data.forEach( restaurant => {
    //       restaurants[restaurant.id] = restaurant;
    //     });
    //     dispatch(addRestaurants(restaurants));
    // })

  }
}

export const fetchCoordinates = (address) => (dispatch) =>{
  const apiKey = 'AIzaSyAtZmX6xZzKxK8oYR1LyJT8CexxG4-m0sA'
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const coordinates = data.results[0].geometry.location;
      dispatch(addCoordinates(coordinates))
    })
  
}


export const fetchResetPassword = (email) => (dispatch) => {
  console.log(email)
  alert('Reset button works')
}

export const fetchContactForm = (request) => (dispatch) => {
  console.log(request);
  alert('Thank you for your message! We will reply as soon as possible!')
}