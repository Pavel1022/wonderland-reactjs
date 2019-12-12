import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import Comment from '../Comment components/comments/Comment';
import LoggedInPost from './HomepagePostsViews/loggedInPost';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            post: {},
            comments: [],
            hidden: true,
            comment: '',
            myPosts: [],
            allComments: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (!cookie.load('x-auth-token')) {
            return window.location.href = '/user/login';
        }
        const user = jwtDecode(cookie.load('x-auth-token'));
        const post = this.props.match.params.id


        axios.post('http://localhost:3100/api/current/post', { id: post }).then(res => {
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

    handleComment = (event) => {
        this.setState({ comment: event.currentTarget.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.comment.length > 0) {
            axios.post('http://localhost:3100/api/comment/create', {
                comment: this.state.comment,
                userId: this.state.currentUser.id,
                postId: this.state.post.id
            })
                .then(res => {
                    if (res.data === 'SUCCESS') {
                        window.location.reload();
                    }
                })
        }
    }

    render() {
        const date = this.state.post.createdAt;
        const user = this.state.currentUser;
        const post = this.state.post;

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
                                    <div className="row pt-md-4">
                                        <div className="col-md-12">
                                            <div className="blog-entry-2 ftco-animate fadeInUp ftco-animated">
                                                <a className="img" style={{ backgroundImage: `url(http://localhost:3100/public/post/${this.state.post.image}.jpg)` }} aria-disabled="true"></a>
                                                <div className="text pt-4">
                                                    <h3 className="mb-4"><a aria-disabled="true">{this.state.post.title}</a></h3>
                                                    <p className="mb-4" style={{ display: 'block', width: '623px', wordWrap: 'break-word' }}>{this.state.post.description}</p>
                                                    <div className="author mb-4 d-flex align-items-center">
                                                        <a className="img" style={{ backgroundImage: `url(http://localhost:3100/public/user/${this.state.post.user.image}.jpg)` }}></a>
                                                        <div className="ml-3 info">
                                                            {this.state.post.user.role === 'ADMIN' ? (<span>Posted by Admin</span>) : (<span>Posted by</span>)}
                                                            <h3><b>{this.state.post.user.firstName} {this.state.post.user.lastName}</b>, <span>{date.split('T')[0].split('-')[2] + '-' + date.split('T')[0].split('-')[1] + '-' + date.split('T')[0].split('-')[0]}</span></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.currentUser.id === this.state.post.userId || this.state.currentUser.role === 'ADMIN' ? (<React.Fragment>
                                                    <a className="btn btn-success" href={'/post/edit/' + this.state.post.id} role="button" style={{ marginLeft: "62%" }}>Edit Post</a>
                                                    <a className="btn btn-danger" href={'/post/delete/' + this.state.post.id} role="button" style={{ marginLeft: "2%" }}>Delete Post</a>
                                                </React.Fragment>) : ''}
                                                <br /><br />
                                                {this.state.currentUser.ban ? (<React.Fragment>
                                                    <p style={{ color: '#C82829' }}><strong>You have BAN !</strong></p>
                                                    <div className="form-group">
                                                        <textarea name="comment" cols="30" rows="7" className="form-control" placeholder="Comment" disabled></textarea>
                                                    </div>
                                                </React.Fragment>) : (
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="form-group">
                                                                <textarea name="comment" cols="30" rows="7" className="form-control" placeholder="Comment" onChange={this.handleComment}></textarea>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="submit" value="Comment" className="btn btn-primary py-3 px-5" />
                                                            </div>
                                                        </form>
                                                    )}
                                                <div className="bg-light p-5 contact-form">
                                                    <h3>Comments:</h3>
                                                    <hr />
                                                    {this.state.comments.length > 0 ? '' : (<h3>No comments</h3>)}
                                                    {this.state.comments.map(function (comment) {
                                                        return <Comment comment={comment} currentUser={user} post={post} />
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 sidebar ftco-animate bg-light pt-5 fadeInUp ftco-animated">
                                    <div className="sidebar-box ftco-animate fadeInUp ftco-animated">
                                        <h3 className="sidebar-heading" style={{ textAlign: "center" }}>My Posts</h3>
                                        {this.state.myPosts.map(function (post) {
                                            return <LoggedInPost post={post} commentObj={commentObj}/>
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

export default PostPage;