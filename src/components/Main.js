import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import PhotoBooth from "./PhotoBooth";

class Main extends Component {
    render() {
        return (
            <div className = 'main'>
                <Switch>
                    <Route path = '/register'>
                        <div>
                            <Register />
                            <PhotoBooth />
                        </div>
                    </Route>
                </Switch>
                <Switch>
                    <Route path = '/login'>
                        <div>
                            <Login />
                            <PhotoBooth />
                        </div>
                    </Route>
                </Switch>
                <Switch>
                    <Route path = '/home'>
                        <Home />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Main;