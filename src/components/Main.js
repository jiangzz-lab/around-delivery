import React, {Component} from 'react';

import Register from "./Register";
import LoginForm from "./Login";
import Home from "./Home";

class Main extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <Register />
                <Home />
            </div>
        );
    }
}

export default Main;