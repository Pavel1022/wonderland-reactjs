import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            title: '',
            description: '',
            image: '',
            errors: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (!cookie.load('x-auth-token')) {
            return window.location.href = '/user/login';
        }
        const user = jwtDecode(cookie.load('x-auth-token'));

        axios.post('http://localhost:3100/api/current/user', { userId: user.id })
            .then(res => res.data)
            .then((data) => {
                this.setState({ user: data });
            });
    }

    imageHandleChange = (event) => {
        this.setState({ image: event.currentTarget.files });
    }

    titleHandleChange = (event) => {
        this.setState({ title: event.currentTarget.value });
    }

    descriptionHandleChange = (event) => {
        this.setState({ description: event.currentTarget.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.errors = [];

        if (this.state.title.length < 7) {
            this.state.errors.push('Title must have minimum 8 symbols!');
            this.forceUpdate();
        }
        if (this.state.description.length < 29) {
            this.state.errors.push('Description must have minimum 30 symbols!');
            this.forceUpdate();
        }
        const file = this.state.image[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
            }
            else {
                this.state.errors.push('Image must be jpg or png type!');
            }
        } else {
            this.state.errors.push('You must upload image!');
            this.forceUpdate();
        }

        if (this.state.errors.length === 0) {
            const image = this.state.image[0];
            const data = new FormData();
            data.append('title', this.state.title);
            data.append('description', this.state.description);
            data.append('image', image);
            data.append('userId', this.state.user.id);

            const url = `http://localhost:3100/api/post/create`;
            axios.post(url, data).then(() => {
                window.location.href = '/';
            });
        }
        this.forceUpdate();
    }





    render() {
        return this.state.user.ban ? (
            <React.Fragment>
                <div id="colorlib-main">
                    <section className="ftco-section">
                        <div className="container">
                            <div className="bg-light p-5 contact-form">
                                <h3 className="mb-4" style={{ textAlign: 'center' }}>Create Post !</h3>
                                <p style={{ color: '#C82829' }}><strong>You have BAN !</strong></p>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Title" name="title" disabled />
                                </div>
                                <div className="form-group">
                                    <textarea name="description" cols="30" rows="7" className="form-control" placeholder="Description" disabled></textarea>
                                </div>
                                <div classNameName="form-group">
                                    <span style={{ marginRight: '3%' }} disabled>Change profile picture!</span>
                                    <input type="file" id="file" name="image" disabled />
                                    <label for="file" disabled>Choose an Image</label>
                                </div>
                                <div className="form-group">
                                    <a href="/"><u>Back</u></a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        ) :
            (
                <React.Fragment>
                    <div id="colorlib-main">
                        <section classNameName="ftco-section">
                            <div classNameName="container">
                                <form onSubmit={this.handleSubmit} className="bg-light p-5 contact-form" enctype="multipart/form-data">
                                    <h3 className="mb-4" style={{ textAlign: 'center' }}>Create Post !</h3>
                                    {this.state.errors.length > 0 ? (
                                        <div className="alert alert-danger">
                                            <ul>
                                                {this.state.errors.map(function (error) {
                                                    return <li>{error}</li>
                                                })}
                                            </ul>
                                        </div>) : ''}
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Title" name="title" onChange={this.titleHandleChange} />
                                    </div>
                                    <div className="form-group">
                                        <textarea name="description" cols="30" rows="7" className="form-control" placeholder="Description" onChange={this.descriptionHandleChange}></textarea>
                                    </div>
                                    <div classNameName="form-group">
                                        <span style={{ marginRight: '3%' }}>Change profile picture!</span>
                                        <input type="file" id="file" name="image" onChange={this.imageHandleChange} />
                                        <label for="file">Choose an Image</label>
                                    </div>
                                    <div className="form-group">
                                        <input style={{ marginRight: '2.5em' }} type="submit" value="Post" className="btn btn-primary py-3 px-5" />
                                        <a href="/"><u>Cancel</u></a>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </React.Fragment>
            );
    }
}

export default CreatePost;