import React from 'react';
import '../css/bootstrap/bootstrap-grid.css';
import '../css/bootstrap/bootstrap-reboot.css';
import '../css/css/mixins/_text-hide.css';
import '../css/css/bootstrap-reboot.css';
import '../css/ajax-loader.gif';
import '../css/animate.css';
import '../css/aos.css';
import '../css/bootstrap-datepicker.css';
import '../css/bootstrap.min.css';
import '../css/jquery.timepicker.css';
import '../css/magnific-popup.css';
import '../css/open-iconic-bootstrap.min.css';
import '../css/owl.theme.default.min.css';
import '../css/style.css';
import HeaderBackgroundImage from '../images/bg_1.jpg';


function Header() {
    return(
      <React.Fragment>
        <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
        <aside id="colorlib-aside" role="complementary" class="js-fullheight">
          <div class="colorlib-header">
            <h1 id="colorlib-logo" class="mb-4"><a href="#" style={{backgroundImage: `url(${HeaderBackgroundImage})`}}>Wonder<span>Land</span></a></h1>
          </div>
          <hr></hr>
          <nav id="colorlib-main-menu" role="navigation">
            <ul>
              <li class="colorlib-active"><a href="#">Home</a></li>
              {/* <li><a href="#">Home</a></li> */}
              {/* <li class="colorlib-active"><a href="#">Profile</a></li> */}
              <li><a href="#">Profile</a></li>
              {/* <li class="colorlib-active"><a href="#">All Users</a></li> */}
              <li><a href="#">All Users</a></li>
              {/* <li class="colorlib-active"><a href="#">New Post</a></li> */}
              <li><a href="#">New Post</a></li>
              {/* <li class="colorlib-active"><a href="#">My Posts</a></li> */}
              <li><a href="#">My Posts</a></li>
              <li><a href="#">Logout</a></li>
              {/* <li class="colorlib-active"><a href="#">Register</a></li> */}
              <li><a href="#">Register</a></li>
              {/* <li class="colorlib-active"><a href="#">Login</a></li> */}
              <li><a href="#">Login</a></li>
            </ul>
          </nav>
          <div class="colorlib-footer">
            <p class="pfooter">Created by: Pavel Milashki</p>
          </div>
        </aside>
        </React.Fragment>
    );
}

export default Header;