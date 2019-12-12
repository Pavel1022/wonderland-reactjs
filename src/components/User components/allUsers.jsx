import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import User from './user/User';

class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            hidden: true
        };
    }

    componentDidMount() {
        if (!cookie.load('x-auth-token')) {
            return window.location.href = '/user/login';
        }
        const user = jwtDecode(cookie.load('x-auth-token'));

        axios.post('http://localhost:3100/api/current/user', { userId: user.id })
            .then(res => res.data)
            .then((data) => {
                if (data.role === 'ADMIN') {
                    this.setState({ hidden: false });
                } else {
                    window.location.href = '/';
                    return;
                }
                this.setState({ user: data });
            });

            axios.get('http://localhost:3100/api/users').then(users => {
                this.setState({users: users.data});
                this.forceUpdate();
            });
    }

    render() {
        return this.state.hidden ? '' : (
            <React.Fragment>
                <div id="colorlib-main">
                    <section className="ftco-section">
                        <div className="container">
                            {this.state.users.map((user) => {
                                return <User user={user} />
                            })}
                        </div>
                    </section>
                </div>
            </React.Fragment >
        );
    }
}

export default AllUsers;