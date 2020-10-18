import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './components/AppHeader/AppHeader';
import HeadNavBar from './components/HeaderNavBar/HeaderNavBar';
import Routes from './components/Routes/Routes';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Router>
          <AppHeader />
          { this.props.isAuthenticated ? <HeadNavBar userAttributes={this.props.userAttributes} /> : null }
          <Routes />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAttributes: state.userAttributes,
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
