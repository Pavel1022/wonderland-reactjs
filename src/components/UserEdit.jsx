import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import '../css/fileStyle.scss'

class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            hidden: true,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            image: '',
            imageURL: '',
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    firstNameHandleChange = (event) => {
        this.setState({ firstName: event.currentTarget.value });
    }

    lastNameHandleChange = (event) => {
        this.setState({ lastName: event.currentTarget.value });
    }

    emailHandleChange = (event) => {
        this.setState({ email: event.currentTarget.value });
    }

    phoneHandleChange = (event) => {
        this.setState({ phone: event.currentTarget.value });
    }

    imageHandleChange = (event) => {
        this.setState({ image: document.getElementsByName("image")[0].files[0] });
        console.log(document.getElementsByName("image")[0].files[0]);

    }

    handleSubmit(event) {
        event.preventDefault();
        let newData = new FormData();
        this.state.errors = [];

        if (!this.state.firstName.length > 0) {
            newData.append('firstName', this.state.user.firstName)
        } else {
            if (this.state.firstName.length >= 4 && this.state.firstName.length <= 16) {
                newData.appen('firstName', this.state.firstName)
            } else {
                this.state.errors.push('First name must have minimum 4 sumbols and maximum 16!');
            }
        }
        if (!this.state.lastName.length > 0) {
            newData.append('lastName', this.state.user.lastName)
        } else {
            if (this.state.lastName.length >= 4 && this.state.lastName.length <= 16) {
                newData.append('lastName', this.state.lastName)
            } else {
                this.state.errors.push('Last name must have minimum 4 sumbols and maximum 16!');
            }
        }
        if (!this.state.email.length > 0) {
            newData.append('email', this.state.user.email)
        } else {
            const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regexEmail.test(this.state.email)) {
                this.state.errors.push('Invalid email!');
            } else {
                newData.append('email', this.state.email)
            }
        }
        if (!this.state.phone.length > 0) {
            newData.append('phone', this.state.user.phone)
        } else {
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (regex.test(this.state.phone)) {
                newData.append('phone', this.state.phone)
            } else {
                this.state.errors.push('Invalid phone number!');
            }
            newData.append('phone', this.state.phone)
        }

        if (this.state.errors.length > 0) {
            this.forceUpdate();
        } else {
            const file = this.state.image;
            if (file) {

                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    newData.append('image', file)

                    const url = `http://localhost:3100/api/edit/user/${this.state.user.id}`;
                    axios.post(url, newData).then(res => {


                        window.location.href = '/user/profile';
                    });
                } else {
                    this.state.errors.push('Image must be jpg or png type!');
                    this.forceUpdate();
                }

            } else {
                newData.append('image', this.state.user.image)

                const url = `http://localhost:3100/api/edit/user/${this.state.user.id}`;
                axios.post(url, newData).then(res => {
                    window.location.href = '/user/profile';
                });
            }
        }
    }

    componentDidMount() {
        if (!cookie.load('x-auth-token')) {
            return window.location.href = '/user/login';
        }
        const user = jwtDecode(cookie.load('x-auth-token'));
        const selectedUserId = Number(this.props.match.params.id);

        axios.post('http://localhost:3100/api/current/user', { userId: user.id })
            .then(res => res.data)
            .then((data) => {
                if (data.id === selectedUserId) {
                    console.log(true);
                    this.setState({ hidden: false });
                } else {
                    window.location.href = '/';
                    return;
                }
                this.setState({ user: data });
            });
    }

    render() {
        return this.state.hidden ? '' : (
            <React.Fragment>
                <div id="colorlib-main">
                    <section className="ftco-section">
                        <div className="container">
                            <form onSubmit={this.handleSubmit} className="bg-light p-5 contact-form" encType="multipart/form-data">
                                <h3 className="mb-4" style={{ textAlign: "center" }}>Edit your profile !</h3>
                                <div class="alert alert-warning" role="alert">
                                    <p>If you leave one of the fields blank, the correct date will not change!</p>
                                </div>
                                {this.state.errors.length > 0 ? (
                                    <div class="alert alert-danger">
                                        <ul>
                                            {this.state.errors.map(function (error) {
                                                return <li>{error}</li>
                                            })}
                                        </ul>
                                    </div>) : ''}
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder={this.state.user.firstName} name="firstName" onChange={this.firstNameHandleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder={this.state.user.lastName} name="lastName" onChange={this.lastNameHandleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder={this.state.user.email} name="email" onChange={this.emailHandleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="tel" className="form-control" placeholder={this.state.user.phone} name="phone" onChange={this.phoneHandleChange} />
                                </div>
                                <div className="form-group">
                                    <span style={{ marginRight: '3%' }}>Change profile picture!</span>
                                    <input type="file" id="file" name="image" onChange={this.imageHandleChange} />
                                    <label for="file">Choose an Image</label>
                                </div>
                                <div className="form-group">
                                    <input style={{ marginRight: "2em" }} type="submit" placeholder="Change" className="btn btn-primary py-3 px-5" />
                                    <a href="/user/profile"><u>Cancel</u></a>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </React.Fragment >
        );
    }
}

export default UserEdit;