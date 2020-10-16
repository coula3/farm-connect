import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        Welcome to farmConnect!
      </div>
    );
  }

  componentDidMount(){
    const bodyData = {
      user: {
            email: "t@sam.com",
            password: "123"
          }
    }

    fetch(`http://localhost:3000/api/v1/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(json => {
      localStorage.setItem('jwt_token', json.jwt)
      console.log(json) 
    })

  //   const bodyData = {
  //     user:  {
  //         type: "Farmer",
  //       first_name: "Troy",
  //       last_name: "Sam",
  //       state: "Kansas",
  //       email: "t@sam.com",
  //       password: ""
  //     }
  //   }

  //   fetch(`http://localhost:3000/api/v1/users`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(bodyData)
  //   })
  //   .then(response => response.json())
  //   .then(json => console.log(json))
  }
}

export default App;
