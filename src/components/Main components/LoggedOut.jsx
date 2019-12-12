import React, { Component } from 'react';
import axios from 'axios';

class loggedOutView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            hidden: true,
            comments: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3100/api/post/all').then(res => {
            this.setState({ posts: res.data });
            axios.get('http://localhost:3100/api/all/comments').then(res => {
                this.setState({ comments: res.data });
                this.setState({ hidden: false });
            });
        });
    }

    render() {
        let commentObj = {};
        this.state.comments.forEach(comment => {
            if (commentObj[`${comment.postId}`]) {
                commentObj[`${comment.postId}`]++;
            } else {
                commentObj[`${comment.postId}`] = 1;
            }

        });

        return this.state.hidden ? '' : (
            <React.Fragment>
                <div id="colorlib-main">
                    <section className="ftco-section">
                        <div className="container">
                            <div className="row px-md-4">
                                <div className="col-md-12">
                                    {this.state.posts.length === 0 ? (
                                        <React.Fragment>
                                            <h3 style={{ textAlign: 'center' }}>No Posts</h3>
                                        </React.Fragment>
                                    ) : ''}
                                    {this.state.posts.map(function (post) {
                                        return (
                                            <React.Fragment>
                                                <div className="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                                                    <a className="img img-2" aria-disabled="true" style={{ backgroundImage: `url(http://localhost:3100/public/post/${post.image}.jpg)` }}></a>
                                                    <div className="text text-2 pl-md-4">
                                                        <h3 className="mb-2"><a aria-disabled="true">{post.title}</a></h3>
                                                        <div className="meta-wrap">
                                                            <p className="meta">
                                                                <span><i className="icon-calendar mr-2"></i>{post.createdAt.split('T')[0].split('-')[2] + '-' + post.createdAt.split('T')[0].split('-')[1] + '-' + post.createdAt.split('T')[0].split('-')[0]}</span>
                                                                <span><i className="icon-calendar mr-2"></i>/</span>
                                                                <span><i className="icon-calendar mr-2"></i>Comments: {commentObj[`${post.id}`] !== undefined ? commentObj[`${post.id}`] : '0'}</span>
                                                            </p>
                                                        </div>
                                                        <p><a href={'/post/view/' + post.id} className="btn-custom">Read More <span className="ion-ios-arrow-forward"></span></a></p>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default loggedOutView;