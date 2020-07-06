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
                            <PhotoBooth />
                            <Register />
                        </div>
                    </Route>

                    <Route path = '/login'>
                        <div>
                            <PhotoBooth />
                            <Login />
                        </div>
                    </Route>


                    <Route path = '/home' component={Home} />
                </Switch>
            </div>
        );
    }
}

export default Main;