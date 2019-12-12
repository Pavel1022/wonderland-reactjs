import React, { Component } from 'react';

class mainPost extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const date = this.props.post.createdAt;

        return (
            <React.Fragment>


                <div className="col-md-12">
                    <div className="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                        <a className="img img-2" aria-disabled="true" style={{ backgroundImage: `url(http://localhost:3100/public/post/${this.props.post.image}.jpg)` }}></a>
                        <div className="text text-2 pl-md-4">
                            <h3 className="mb-2"><a aria-disabled="true">{this.props.post.title}</a></h3>
                            <div className="meta-wrap">
                                <p className="meta">
                                    <span><i className="icon-calendar mr-2"></i>{date.split('T')[0].split('-')[2] + '-' + date.split('T')[0].split('-')[1] + '-' + date.split('T')[0].split('-')[0]}</span>
                                    <span><i className="icon-calendar mr-2"></i>/</span>
                                    <span><i className="icon-calendar mr-2"></i>Comments: {this.props.commentObj[`${this.props.post.id}`] !== undefined ? this.props.commentObj[`${this.props.post.id}`] : '0'}</span>
                                </p>
                            </div>
                            <p><a href={'/post/view/' + this.props.post.id} className="btn-custom">Read More <span className="ion-ios-arrow-forward"></span></a></p>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default mainPost;