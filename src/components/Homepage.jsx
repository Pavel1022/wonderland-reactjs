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
import Header from './Header'
import Posts from './Posts'


function Homepage() {
    return (
        <div id="colorlib-page">
            <Posts />
        </div>
    );
}

export default Homepage;