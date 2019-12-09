import React, { Component } from 'react';
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import cookie from 'react-cookies';
import axios from 'axios';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLogged: false
    }
  }
  componentDidMount() {
    if (cookie.load('x-auth-token')) {
      this.setState({ isLogged: true });
    } else {
      this.setState({ isLogged: false });
    }
  }

  render() {
    return (
      <div id="colorlib-page">
        {this.state.isLogged === true ? (<LoggedIn />) : (<LoggedOut />)}
      </div>
    );
  }
}

export default Homepage;