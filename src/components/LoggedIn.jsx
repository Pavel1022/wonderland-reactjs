import React from 'react';
import Testimage from '../images/image_1.jpg'

function loggedInView() {
    return (
        <React.Fragment>
            <div id="colorlib-main">
                <section className="ftco-section ftco-no-pt ftco-no-pb">
                    <div className="container">
                        <div className="row d-flex">
                            <div className="col-xl-8 py-5 px-md-5">
                                <div className="row pt-md-4">
                                    <div className="col-md-12">
                                        <div className="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                                            <a className="img img-2" aria-disabled="true" style={{ backgroundImage: `url(${Testimage})` }}></a>
                                            <div className="text text-2 pl-md-4">
                                                <h3 className="mb-2"><a aria-disabled="true">Title2 Title2 Title2 Title Title Title Title Title Title Title Title Title Title</a></h3>
                                                <div className="meta-wrap">
                                                    <p className="meta">
                                                        <span><i className="icon-calendar mr-2"></i>Date</span>
                                                        <span><i className="icon-comment2 mr-2"></i> Comment</span>
                                                    </p>
                                                </div>
                                                <p><a href="" className="btn-custom">Read More <span className="ion-ios-arrow-forward"></span></a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 sidebar ftco-animate bg-light pt-5 fadeInUp ftco-animated">
                                <div className="sidebar-box ftco-animate fadeInUp ftco-animated">
                                    <h3 className="sidebar-heading" style={{ textAlign: "center" }}>My Posts</h3>
                                    <div className="block-21 mb-4 d-flex">
                                        <a href="" className="blog-img mr-4" style={{ backgroundImage: `url(${Testimage})` }}></a>
                                        <div className="text">
                                            <h3 className="heading"><a href="">Post Title</a>
                                            </h3>
                                            <div className="meta">
                                                <div><a><span className="icon-calendar"></span>Date</a></div>
                                                <div><a><span className="icon-chat"></span>Comment</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center" }}>You haven't posts ? <a href="">Create one !</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
}

export default loggedInView;