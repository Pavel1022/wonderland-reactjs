import React, { Component } from 'react';
import HeaderBackgroundImage from '../images/bg_1.jpg';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { all } from 'q';

class Header extends Component {

  state = {
    user: [],
    isLogged: false
  }

  componentDidMount() {
    if (cookie.load('x-auth-token')) {
      const user = jwtDecode(cookie.load('x-auth-token'));

      axios.post('http://localhost:3100/api/current/user', { userId: user.id })
        .then(res => res.data)
        .then((data) => {
          this.setState({ user: data });
          this.setState({ isLogged: true });
        });
    }

  }
  render() {
    const path = window.location.pathname;
    let allUsers;

    if (path === '/users/all') {
      allUsers = (<li className="colorlib-active"><a href="/users/all">All Users</a></li>);
    } else {
      allUsers = (<li><a href="/users/all">All Users</a></li>)
    }

    return (
      <React.Fragment>
        <a href="/" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
        <aside id="colorlib-aside" className="js-fullheight">
          <div className="colorlib-header">
            <h1 id="colorlib-logo" className="mb-4"><a href="/" style={{ backgroundImage: `url(${HeaderBackgroundImage})` }}>Wonder<span>Land</span></a></h1>
          </div>
          <hr></hr>
          <nav id="colorlib-main-menu" role="navigation">
            <ul>
              {path === '/' ? (<li className="colorlib-active"><a href="/">Home</a></li>) : (<li><a href="/">Home</a></li>)}
              {this.state.isLogged ? (
                <React.Fragment>
                  {path === '/user/profile' ? (<li className="colorlib-active"><a href="/user/profile">Profile</a></li>) : (<li><a href="/user/profile">Profile</a></li>)}
                  {this.state.user.role === 'ADMIN' ? (allUsers) : ''}
                  {path === '/register' ? (<li className="colorlib-active"><a href="#">New Post</a></li>) : (<li><a href="#">New Post</a></li>)}
                  {path === '/register' ? (<li className="colorlib-active"><a href="#">My Posts</a></li>) : (<li><a href="#">My Posts</a></li>)}
                  <li><a href="/logout">Logout</a></li>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {path === '/user/register' ? (<li className="colorlib-active"><a href="/user/register">Register</a></li>) : (<li><a href="/user/register">Register</a></li>)}
                    {path === '/user/login' ? (<li className="colorlib-active"><a href="/user/login">Login</a></li>) : (<li><a href="/user/login">Login</a></li>)}
                  </React.Fragment>
                )}
            </ul>
          </nav>
          <div className="colorlib-footer">
            <p className="pfooter">Created by: Pavel Milashki</p>
          </div>
        </aside>
      </React.Fragment>
    );
  }
}

export default Header;