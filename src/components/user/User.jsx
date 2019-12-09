import React, { Component } from 'react';
import axios from 'axios';

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


    render() {
        const user = this.props.user
        let bans = user.ban ? (<button class="btn btn-success" name={user.username} onClick={this.unBanUser} role="button">Unban</button>) : (<button class="btn btn-danger" name={user.username} onClick={this.banUser} role="button">Ban</button>);
        return (
            <React.Fragment>
                <div class="row pt-md-4">
                    <div class="col-md-12">
                        <div class="blog-entry ftco-animate d-md-flex fadeInUp ftco-animated">
                            <a class="img img-2" style={{ backgroundImage: `url(${user.image})` }} aria-disabled="true"></a>
                            <div class="text text-2 pl-md-4">
                                <div class="meta-wrap">
                                    <h3 class="mb-2" style={{ marginTop: "5%" }}>{user.username}</h3>
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