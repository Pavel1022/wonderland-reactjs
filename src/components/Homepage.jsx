import React from 'react';
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import cookie from 'react-cookies';


function Homepage() {
    let isLogged;
  if (cookie.load('x-auth-token')) {
    isLogged = true;
  } else {
    isLogged = false;
  }
    return (
        <div id="colorlib-page">
            {isLogged === true ? (<LoggedIn />) : (<LoggedOut />)}
        </div>
    );
}

export default Homepage;