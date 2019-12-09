import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

class EditPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            hidden: true,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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
                    this.setState({ hidden: false });
                } else {
                    window.location.href = '/';
                    return;
                }
                this.setState({ user: data });
            });
    }

    oldPassword = (event) => {
        this.setState({ oldPassword: event.currentTarget.value });
    }

    newPassword = (event) => {
        this.setState({ newPassword: event.currentTarget.value });
    }

    confirmPassword = (event) => {
        this.setState({ confirmPassword: event.currentTarget.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const newPassword = this.state.newPassword;
        const confirmPassword = this.state.confirmPassword;
        const oldPassword = this.state.oldPassword;

        this.state.errors = [];

        if (!oldPassword) {
            this.state.errors.push('Currect Password field is empty!');
        } 
        if (!newPassword) {
            this.state.errors.push('New Password field is empty!');
        }
        if (!confirmPassword) {
            this.state.errors.push('Confirm Password field is empty!');
        }
        if (newPassword && confirmPassword) {

            if (newPassword.length < 8) {
                this.state.errors.push('Password must have minimum 8 symbols!');
            }
            
            if (newPassword === confirmPassword) {
                
                if(this.state.errors.length === 0) {
                    
                    axios.post('http://localhost:3100/api/user/password/change', { id: this.state.user.id, password: oldPassword, newPassword })
                    .then(res => {
                        if (res.data === 'SUCCESS') {
                            window.location.href = '/user/profile';
                        } else {
                            this.state.errors.push('Wrong password!');
                            this.forceUpdate();
                        }
                    });
                }
            }
            else {
                this.state.errors.push('Passwords don\'t match!');
            }
        }
        this.forceUpdate();
    }

    render() {

        return this.state.hidden ? '' : (
            <React.Fragment>
                <div id="colorlib-main">
                    <section className="ftco-section">
                        <div className="container">
                            <form onSubmit={this.handleSubmit} className="bg-light p-5 contact-form" encType="multipart/form-data">
                                <h3 className="mb-4" style={{ textAlign: "center" }}>Change your password !</h3>
                                {this.state.errors.length > 0 ? (
                                    <div class="alert alert-danger">
                                        <ul>
                                        {this.state.errors.map(function (error) {
                                            return <li>{error}</li>
                                        })}
                                        </ul>
                                    </div>) : ''}

                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Current Password" name="oldPassword" onChange={this.oldPassword} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="New Password" name="newPassword" onChange={this.newPassword} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Repeat Password" name="confirmPassword" onChange={this.confirmPassword} />
                                </div>
                                <div className="form-group">
                                    <input style={{ marginRight: "2em" }} type="submit" placeholder="Change" className="btn btn-primary py-3 px-5" />
                                    <a href="/user/profile"><u>Cancel</u></a>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default EditPassword;