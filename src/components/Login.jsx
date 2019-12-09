import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            username: '',
            password: '',
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

    handleSubmit(event) {
        event.preventDefault();
        this.state.errors = [];

        axios.post('http://localhost:3100/api/login/user', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if (res.data !== 'Wrong password or username!') {
                cookie.save('x-auth-token', res.data, { path: '/' });
                window.location.href = '/';
            } else {
                this.state.errors.push(res.data);
                this.forceUpdate();
            }
        });

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
                                <input style={{ marginRight: "2em" }} type="submit" value="Login" className="btn btn-primary py-3 px-5" />
                                <a href="/"><u>Cancel</u></a>
                            </div>
                            <div className="form-group">
                                <p>Are you haven't Account ? <a href="/user/register">Register</a></p>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </React.Fragment>);
    }
}

export default Login;