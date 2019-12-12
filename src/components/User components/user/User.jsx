import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // users: [],
            // hidden: true
        };
    }

    banUser = (event) => {
        const username = event.currentTarget.name

        axios.post('http://localhost:3100/api/user/ban', { username }).then(() => {
            window.location.href = '/users/all';
        });
    }

    unBanUser = (event) => {
        const username = event.currentTarget.name

        axios.post('http://localhost:3100/api/user/unban', { username }).then(() => {
            window.location.href = '/users/all';
        });
    }

    componentDidMount() {
        if (!cookie.load('x-auth-token')) {
            window.location.href = '/';
        }
    }


    render() {
        const user = this.props.user
        let bans = user.ban ? (<button className="btn btn-success" name={user.username} onClick={this.unBanUser} role="button">Unban</button>) : (<button className="btn btn-danger" name={user.username} onClick={this.banUser} role="button">Ban</button>);
        return (
            <React.Fragment>
                <div className="row pt-md-4">
                    <div className="col-md-12">
                        <div className="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                            <a className="img img-2" style={{ backgroundImage: `url(http://localhost:3100/public/user/${user.image}.jpg)` }} aria-disabled="true"></a>
                            <div className="text text-2 pl-md-4">
                                <div className="meta-wrap">
                                    <h3 className="mb-2" style={{ marginTop: "5%" }}>{user.username}</h3>
                                    {user.role === 'ADMIN' ? (<span>Admin</span>) : bans}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default User;