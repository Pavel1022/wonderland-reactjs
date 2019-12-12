import React, { Component } from 'react';
import LoggedInPost from '../Post components/HomepagePostsViews/loggedInPost'
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import MainPost from '../Post components/HomepagePostsViews/mainPost';

class LoggedInView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            myPosts: [],
            comments: []
        }
    }

    componentDidMount() {
        const user = jwtDecode(cookie.load('x-auth-token'));

        axios.get('http://localhost:3100/api/post/all').then(res => {
            this.setState({ posts: res.data });
            this.forceUpdate();
        });

        axios.post('http://localhost:3100/api/post/mypost', { id: user.id }).then(res => {
            this.setState({ myPosts: res.data });
            this.forceUpdate();
        });

        axios.get('http://localhost:3100/api/all/comments').then(res => {
            this.setState({ comments: res.data });
            this.setState({ hidden: false });
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
        return (
            <React.Fragment>
                <div id="colorlib-main">
                    <section className="ftco-section ftco-no-pt ftco-no-pb">
                        <div className="container">
                            <div className="row d-flex">
                                <div className="col-xl-8 py-5 px-md-5">
                                    <div className="row pt-md-4">
                                        {this.state.posts.length === 0 ? (
                                            <div className="row pt-md-4">
                                                <div className="col-md-12">
                                                    <div className="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                                                        <h3 className="mb-2"><a aria-disabled="true" style={{ textAlign: 'center' }}>There is no posts!</a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : ''}
                                        {this.state.posts.map(function (post) {
                                            return <MainPost post={post} commentObj={commentObj} />
                                        })}
                                    </div>
                                </div>
                                <div className="col-xl-4 sidebar ftco-animate bg-light pt-5 fadeInUp ftco-animated">
                                    <div className="sidebar-box ftco-animate fadeInUp ftco-animated">
                                        <h3 className="sidebar-heading" style={{ textAlign: "center" }}>My Posts</h3>
                                        {this.state.myPosts.map(function (post) {
                                            return <LoggedInPost post={post} commentObj={commentObj} />
                                        })}
                                        {this.state.myPosts.length > 0 ? '' : (<p style={{ textAlign: "center" }}>You haven't posts ? <a href="/post/create">Create one !</a></p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default LoggedInView;