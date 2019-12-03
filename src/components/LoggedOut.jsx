import React from 'react';
import Testimage from '../images/image_1.jpg'

function loggedOutView() {
    return (
        <React.Fragment>
            <div id="colorlib-main">
                <section className="ftco-section">
                    <div className="container">
                        <div className="row px-md-4">
                            <div className="col-md-12">
                                <div className="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                                    <a className="img img-2" aria-disabled="true" style={{ backgroundImage: `url(${Testimage})` }}></a>
                                    <div className="text text-2 pl-md-4">
                                        <h3 className="mb-2"><a aria-disabled="true">Title Title Title Title Title Title Title Title Title Title Title Title Title</a></h3>
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
                </section>
            </div>
        </React.Fragment>
    );
}

export default loggedOutView;