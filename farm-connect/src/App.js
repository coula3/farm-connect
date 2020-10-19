import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './components/AppHeader/AppHeader';
import HeadNavBar from './components/HeaderNavBar/HeaderNavBar';
import SideNavBar from './components/SideNavBar/SideNavBar';
import Routes from './components/Routes/Routes';
import { signOutUser } from './actions/userActions';

class App extends Component {

  handleUserSignOut = () => {
    this.props.signOutUser();
  }

  render(){
    return (
      <div className="App">
        <Router>
          <AppHeader />
          { this.props.isAuthenticated ? <HeadNavBar userAttributes={this.props.userAttributes} userSignOut={this.handleUserSignOut} /> :  null }
          { this.props.isAuthenticated ? <SideNavBar userSignOut={this.handleUserSignOut} /> : null }
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

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => dispatch(signOutUser()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
