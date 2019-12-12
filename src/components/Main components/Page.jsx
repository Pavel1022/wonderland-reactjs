import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Register from '../User components/Register';
import Login from '../User components/Login';
import Logout from '../User components/Logout';
import Profile from '../User components/Profile';
import NotFound from '../404/404';
import UserEdit from '../User components/UserEdit';
import EditPassword from '../User components/EditPassword';
import AllUsers from '../User components/allUsers';
import CreatePost from '../Post components/CreatePost';
import PostPage from '../Post components/PostPage';
import EditPost from '../Post components/EditPost';
import DeletePost from '../Post components/DeletePost';
import MyPosts from '../Post components/myPosts';

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
                <Route path="/post/edit/:id" exact render={(props) => <EditPost {...props} />} />
                <Route path="/post/delete/:id" exact render={(props) => <DeletePost {...props} />} />
                <Route path="/post/my/posts" exact render={(props) => <MyPosts {...props} />} />

                <React.Fragment>
                    <Route component={NotFound} />
                </React.Fragment>
            </Switch>
        </Router>
    );
}

export default Page;