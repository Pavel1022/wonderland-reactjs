import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    usernameHandleChange = (event) => {
        this.setState({ username: event.currentTarget.value })
    }

    passwordHandleChange = (event) => {
        this.setState({ password: event.currentTarget.value })
    }

    confrimPasswordHandleChange = (event) => {
        this.setState({ confirmPassword: event.currentTarget.value })
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

    handleSubmit(event) {
        event.preventDefault();
        const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        this.state.errors = [];

        if (!(this.state.username.length >= 5 && this.state.username.length <= 16)) {
            this.state.errors.push('Username must have minimum 5 sumbols and maximum 16!');
        }
        if (!(this.state.password.length >= 8)) {
            this.state.errors.push('Password must have minimum 8 sumbols!');
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.state.errors.push('Passwords don\'t match!');
        }
        if (!(this.state.firstName.length >= 4 && this.state.firstName.length <= 16)) {
            this.state.errors.push('First name must have minimum 4 sumbols and maximum 16!');
        }
        if (!(this.state.lastName.length >= 4 && this.state.lastName.length <= 16)) {
            this.state.errors.push('Last name must have minimum 4 sumbols and maximum 16!');
        }
        if (!regexEmail.test(this.state.email)) {
            this.state.errors.push('Invalid email!');
        }
        if (!regexPhone.test(this.state.phone)) {
            this.state.errors.push('Invalid phone number!');
        }

        if (!this.state.errors.length > 0) {
            axios.post('http://localhost:3100/api/register/user', {
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone
            }).then((res) => {                
                if (res.data === 'Username already taken!') {
                    this.state.errors.push(res.data);
                    this.forceUpdate();
                } else {
                    window.location.href = '/user/login';
                }
            });
        }
        this.forceUpdate();
    }

    componentDidMount() {
        if (cookie.load('x-auth-token')) {
            window.location.href = '/';
            this.state.hidden = true;
        }
    }

    render() {
        return this.state.hidden ? '' : (<React.Fragment>
            <div id="colorlib-main">
                <section className="ftco-section">
                    <div className="container">
                        <form onSubmit={this.handleSubmit} className="bg-light p-5 contact-form" encType="multipart/form-data">
                            <h3 className="mb-4" style={{ textAlign: "center" }}>Create your own Wonderland account !</h3>
                            {this.state.errors.length > 0 ? (
                                <div class="alert alert-danger">
                                    <ul>
                                        {this.state.errors.map(function (error) {
                                            return <li>{error}</li>
                                        })}
                                    </ul>
                                </div>) : ''}
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Your Username" name="username" onChange={this.usernameHandleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Your Password" name="password" onChange={this.passwordHandleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={this.confrimPasswordHandleChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={this.firstNameHandleChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={this.lastNameHandleChange} />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email" name="email" onChange={this.emailHandleChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Phone Number" name="phone" onChange={this.phoneHandleChange} />
                            </div>
                            <div className="form-group">
                                <input style={{ marginRight: "2em" }} type="submit" value="Register" className="btn btn-primary py-3 px-5" />
                                <a href="/"><u>Cancel</u></a>
                            </div>
                            <div className="form-group">
                                <p>Already Registered ? <a href="/user/login">Login</a></p>
                            </div>
                            <div className="form-group">
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </React.Fragment>);
    }
}

export default Register;