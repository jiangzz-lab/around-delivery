import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Register from "./Register";
import LoginForm from "./Login";
import Home from "./Home";
import PhotoBooth from "./PhotoBooth";

class Main extends Component {
    render() {
        return (
            <div className = 'main'>
                <Switch>
                    <Route path = '/register'>
                        <Register />
                    </Route>
                </Switch>
                <Switch>
                    <Route path = '/login'>
                        <Login />
                    </Route>
                </Switch>
                <Switch>
                    <Route path = '/home'>
                        <Home />
                    </Route>
                </Switch>
                <PhotoBooth />
                <LoginForm />
                <Register />
                <Home />
            </div>
        );
    }
}

export default Main;