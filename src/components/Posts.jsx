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
import Testimage from '../images/image_1.jpg'

function Posts() {
    return (
        <React.Fragment>
            <div id="colorlib-main">
			<section class="ftco-section ftco-no-pt ftco-no-pb">
	    	<div class="container"></div>
        <div class="row d-flex">
            <div class="col-xl-8 py-5 px-md-5">
                <div class="row pt-md-4">
                    <div class="col-md-12">
                        <div class="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                            <a class="img img-2" aria-disabled="true" style={{backgroundImage: `url(${Testimage})`}}></a>
                            <div class="text text-2 pl-md-4">
                                <h3 class="mb-2"><a aria-disabled="true">Title</a></h3>
                                <div class="meta-wrap">
                                    <p class="meta">
                                        <span><i class="icon-calendar mr-2"></i>Date</span>
                                        <span><i class="icon-comment2 mr-2"></i> Comment</span>
                                    </p>
                                </div>
                                <p><a href="" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 sidebar ftco-animate bg-light pt-5 fadeInUp ftco-animated">
                <div class="sidebar-box ftco-animate fadeInUp ftco-animated">
                    <h3 class="sidebar-heading" style={{textAlign: "center"}}>My Posts</h3>
                    <div class="block-21 mb-4 d-flex">
                        <a href="" class="blog-img mr-4" style={{backgroundImage: `url(${Testimage})`}}></a>
                        <div class="text">
                            <h3 class="heading"><a href="">Post Title</a>
                            </h3>
                            <div class="meta">
                                <div><a><span class="icon-calendar"></span>Date</a></div>
                                <div><a><span class="icon-chat"></span>Comment</a></div>
                            </div>
                        </div>
                    </div>
                    <p style={{textAlign: "center"}}>You haven't posts ? <a href="">Create one !</a></p>
                </div>
            </div >
        </div >
        </section>
        </div>
        </React.Fragment>
    );
}

export default Posts;