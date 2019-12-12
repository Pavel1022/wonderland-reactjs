import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import LoggedInPost from './HomepagePostsViews/loggedInPost';

class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            post: {},
            comments: [],
            hidden: true,
            myPosts: [],
            allComments: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        axios.get('http://localhost:3100/api/post/delete/' + this.state.post.id).then(res => {
            if(res.data === 'SUCCESS') {
                window.location.href = '/';
            }
        });
    }

    componentDidMount() {
        if (!cookie.load('x-auth-token')) {
            return window.location.href = '/user/login';
        }

        const user = jwtDecode(cookie.load('x-auth-token'));
        const postId = Number(this.props.match.params.id);

        axios.post('http://localhost:3100/api/current/post', { id: postId }).then(res => {
            this.setState({ post: res.data });
            axios.post('http://localhost:3100/api/current/user', { userId: user.id })
                .then(res => res.data)
                .then((data) => {
                    this.setState({ currentUser: data });
                    axios.post('http://localhost:3100/api/comment/all', { postId: this.state.post.id }).then(res => {
                        this.setState({ comments: res.data });
                        axios.post('http://localhost:3100/api/post/mypost', { id: user.id }).then(res => {
                            this.setState({ myPosts: res.data });
                            axios.get('http://localhost:3100/api/all/comments').then(res => {
                                this.setState({ allComments: res.data });
                                this.state.hidden = false
                                this.forceUpdate();
                            });
                        });
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
                            <div className="row d-flex">
                                <div className="col-xl-8 px-md-5 py-5">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row pt-md-4">
                                            <div className="col-md-12">
                                                <div className="blog-entry-2 ftco-animate fadeInUp ftco-animated">
                                                    <a className="img" style={{ backgroundImage: `url(http://localhost:3100/public/post/${this.state.post.image}.jpg)` }} aria-disabled="true"></a>
                                                    <div className="text pt-4">
                                                        <h3 className="mb-4"><a aria-disabled="true">{this.state.post.title}</a></h3>
                                                        <p className="mb-4" style={{ display: 'block', width: '623px', wordWrap: 'break-word' }}>{this.state.post.description}</p>
                                                    </div>
                                                    <a className="btn btn-primary" href={'/post/view/' + this.state.post.id} role="button" style={{ marginLeft: '66%' }}>Cancel</a>
                                                    <input className="btn btn-danger" style={{ marginLeft: '2%' }} type="submit" role="button" value="Delete" /><br /><br />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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
            </React.Fragment >
        );
    }
}

export default DeletePost;