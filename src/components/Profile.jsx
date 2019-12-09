import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

class Profile extends Component {
    state = {
        user: []
    }
    componentDidMount() {
        if(!cookie.load('x-auth-token')) {
            return window.location.href = '/user/login';
        }
        const user = jwtDecode(cookie.load('x-auth-token'));

        axios.post('http://localhost:3100/api/current/user', { userId: user.id })
            .then(res => res.data)
            .then((data) => {
                this.setState({ user: data })
            });


    }

    render() {
        return (
            <React.Fragment>
                <div id="colorlib-main">
                    <section className="ftco-section">
                        <div className="container">
                            <form class="bg-light p-5 contact-form" style={{ marginBottom: "30px" }}>
                                <h3 class="mb-4" style={{ textAlign: "center" }}>Your Profile !</h3>
                                <div class="row pt-md-4">
                                    <div class="col-md-12">
                                        <div class="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                                        <a class="img img-2" style={{backgroundImage: `url(http://localhost:3100/public/user/${this.state.user.image}.jpg)`}} aria-disabled="true"></a>
                                            <div class="text text-2 pl-md-4">
                                                    <div class="meta-wrap">
                                                        <h3 class="mb-2">{this.state.user.firstName} {this.state.user.lastName}</h3>
                                                        {this.state.user.role === 'ADMIN' ? (<p style={{ color: "#019006" }}><strong>Admin</strong></p>) : ('')}
                                                        {this.state.user.ban === 1 ? (<p style={{ color: "#C82829" }}><strong>You have BAN !</strong></p>) : ('')}
                                                    </div>
                                                    <p>Username: <strong>{this.state.user.username}</strong></p>
                                                    <p>E-Mail: <strong>{this.state.user.email}</strong></p>
                                                    <p>Phone Number: <strong>{this.state.user.phone}</strong></p>
                                                <a class="btn btn-success" href={'/user/edit/' + this.state.user.id} role="button" style={{ marginLeft: "55%", marginRight: "2%"}}>Edit Profile</a>
                                                <a class="btn btn-danger" href={'/user/password/change/' + this.state.user.id} role="button">Change Password</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;