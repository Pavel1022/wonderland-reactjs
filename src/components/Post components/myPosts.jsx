import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

class MyPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            comments: [],
            hidden: true,
            myPosts: [],
            allComments: []
        }
    }

    componentDidMount() {
        if (!cookie.load('x-auth-token')) {
            return window.locationbar.href = '/user/login';
        }

        const user = jwtDecode(cookie.load('x-auth-token'));

        axios.post('http://localhost:3100/api/current/user', { userId: user.id })
            .then(res => res.data)
            .then((data) => {
                this.setState({ currentUser: data });
                axios.post('http://localhost:3100/api/post/mypost', { id: user.id }).then(res => {
                    this.setState({ myPosts: res.data });
                    axios.get('http://localhost:3100/api/all/comments').then(res => {
                        this.setState({ allComments: res.data });
                        this.setState({ hidden: false });
                        this.forceUpdate();
                    });
                });
            });
    }

    render() {
        let commentObj = {};
        this.state.allComments.forEach(comment => {
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
                            <h3 style={{ textAlign: 'center', marginTop: '30px' }}>My Posts</h3>
                            {this.state.myPosts.length === 0 ? (
                                <React.Fragment>
                                    <p style={{ textAlign: 'center' }}>You haven't posts ? <a href="/post/create">Create one !</a></p>
                                </React.Fragment>
                            ) : ''}
                            {this.state.myPosts.map(function (post) {
                                return (
                                    <React.Fragment>
                                        <div className="row pt-md-4">
                                            <div className="col-md-12">
                                                <div className="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                                                    <a className="img img-2" style={{ backgroundImage: `url(http://localhost:3100/public/post/${post.image}.jpg)` }} aria-disabled="true"></a>
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
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </React.Fragment >
        )
    }
}

export default MyPosts;