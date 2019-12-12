import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            post: {},
            title: '',
            description: '',
            image: '',
            hidden: true,
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    titleHandleChange = (event) => {
        this.setState({ title: event.currentTarget.value });
    }

    descriptionHandleChange = (event) => {
        this.setState({ description: event.currentTarget.value });
    }

    imageHandleChange = (event) => {
        this.setState({ image: event.currentTarget.files });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.errors = [];
        if (this.state.title.length === 0) {
            this.state.title = this.state.post.title;
        } else {
            if (this.state.title.length < 7) {
                this.state.errors.push('Title must have minimum 8 symbols!');
                this.forceUpdate();
            }
        }
        
        if (this.state.description.length === 0) {
            this.state.description = this.state.post.description;
        } else {
            if (this.state.description.length < 29) {
                this.state.errors.push('Description must have minimum 30 symbols!');
                this.forceUpdate();
            }
        }

        const file = this.state.image[0];
        if (typeof this.state.image === 'object') {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                this.state.errors.push('Image must be jpg or png type!');
                this.forceUpdate();
            }
        } else {
            this.state.image = this.state.post.image;
        }

        if (this.state.errors.length === 0) {
            const data = new FormData();

            data.append('title', this.state.title);
            data.append('description', this.state.description);
            if(typeof this.state.image === 'object') {
                data.append('image', this.state.image[0]);
            } else {
                data.append('image', this.state.image);
            }
        
            axios.post('http://localhost:3100/api/post/edit/' + this.state.post.id, data).then(res => {
                if(res.data === 'SUCCESS') {
                    window.location.href = '/post/view/' + this.state.post.id;
                }
            });
        }
    }

    componentDidMount() {
        if (!cookie.load('x-auth-token')) {
            return window.location.href = '/user/login';
        }

        const user = jwtDecode(cookie.load('x-auth-token'));
        const postId = Number(this.props.match.params.id);

        axios.post('http://localhost:3100/api/current/user', { userId: user.id })
            .then(res => res.data)
            .then((data) => {
                this.setState({ user: data });
                axios.post('http://localhost:3100/api/current/post', { id: postId }).then(res => {
                    this.setState({ post: res.data });
                    this.setState({ hidden: false });
                })
            });
    }

    render() {
        return this.state.hidden ? '' : (
            <React.Fragment>
                <div id="colorlib-main">
                    <section className="ftco-section">
                        <div className="container">
                            {this.state.user.ban === 1 ? (
                                <React.Fragment>
                                    <div>
                                        <h3 className="mb-4" style={{ textAlign: 'center' }}>Edit Post !</h3>
                                        <p style={{ color: '#C82829' }}><strong>You have BAN !</strong></p>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="title" placeholder={this.state.post.title} disabled />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="description" cols="30" rows="7" className="form-control" placeholder="Description" disabled></textarea>
                                        </div>
                                        <div className="form-group">
                                            <span style={{ marginRight: '3%' }} disabled>Change profile picture!</span>
                                            <input type="file" id="file" name="image" disabled />
                                            <label for="file" disabled>Choose an Image</label>
                                        </div>
                                        <div className="form-group">
                                            <a href={'/post/view/' + this.state.post.id}><u>Back</u></a>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                            <h3 className="mb-4" style={{ textAlign: 'center' }}>Edit Post !</h3>
                                            <div className="alert alert-warning" role="alert">
                                                <p>If you leave one of the fields blank, the correct date will not change!</p>
                                            </div>
                                            {this.state.errors.length > 0 ? (
                                                <div className="alert alert-danger">
                                                    <ul>
                                                        {this.state.errors.map(function (error) {
                                                            return <li>{error}</li>
                                                        })}
                                                    </ul>
                                                </div>) : ''}
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="title" placeholder={this.state.post.title} onChange={this.titleHandleChange} />
                                            </div>
                                            <div className="form-group">
                                                <textarea name="description" cols="30" rows="7" className="form-control" placeholder={this.state.post.description} onChange={this.descriptionHandleChange}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <span style={{ marginRight: '3%' }}>Change post picture!</span>
                                                <input type="file" id="file" name="image" onChange={this.imageHandleChange} />
                                                <label for="file">Choose an Image</label>
                                            </div>
                                            <div className="form-group">
                                                <input style={{ marginRight: '2.5em' }} type="submit" value="Edit" className="btn btn-primary py-3 px-5" />
                                                <a href={'/post/view/' + this.state.post.id}><u>Cancel</u></a>
                                            </div>

                                        </form>
                                    </React.Fragment>
                                )}
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default EditPost;