import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import SignIn from './containers/SignIn/SignIn';

class App extends Component {
  render(){
    return (
      <div className="App">
        <AppHeader />
        <SignIn />
      </div>
    );
  }
}

export default App;
