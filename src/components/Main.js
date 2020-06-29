import React, {Component} from 'react';

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

class Main extends Component {
    render() {
        return (
            <div>
                <Login />
                <Register />
                <Home />
            </div>
        );
    }
}

export default Main;