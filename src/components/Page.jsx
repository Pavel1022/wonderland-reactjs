import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Homepage from './Homepage.jsx';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import NotFound from './404/404';
import UserEdit from './UserEdit';
import EditPassword from './EditPassword';

function Page() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/user/register" component={Register} />
                <Route path="/user/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/user/profile" component={Profile} />
                <Route path="/user/edit/:id" render={(props) => <UserEdit {...props} />}/> 
                <Route path="/user/password/change/:id" render={(props) => <EditPassword {...props} />}/> 

                <React.Fragment>
                <Route component={NotFound} />
                </React.Fragment>
            </Switch>
        </Router>
    );
}

export default Page;