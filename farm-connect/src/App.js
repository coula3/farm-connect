import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import Routes from './components/Routes/Routes';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Router>
          <AppHeader />
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
