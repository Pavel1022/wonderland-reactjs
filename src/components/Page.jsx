import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Homepage from './Homepage.jsx';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import NotFound from './404/404';
import UserEdit from './UserEdit';
import EditPassword from './EditPassword';
import AllUsers from './allUsers';
import CreatePost from './CreatePost';
import PostPage from './PostPage';

function Page() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/user/register" exact component={Register} />
                <Route path="/user/login" exact component={Login} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/user/profile" exact component={Profile} />
                <Route path="/user/edit/:id" exact render={(props) => <UserEdit {...props} />} />
                <Route path="/user/password/change/:id" exact render={(props) => <EditPassword {...props} />} />
                <Route path="/users/all" exact render={(props) => <AllUsers {...props} />} />
                <Route path="/post/create" exact render={(props) => <CreatePost {...props} />} />
                <Route path="/post/view/:id" exact render={(props) => <PostPage {...props} />} />

                <React.Fragment>
                    <Route component={NotFound} />
                </React.Fragment>
            </Switch>
        </Router>
    );
}

export default Page;