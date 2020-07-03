import React, {Component} from 'react';

import Register from "./Register";
import LoginForm from "./Login";
import Home from "./Home";
import PhotoBooth from "./PhotoBooth";

class Main extends Component {
    render() {
        return (
            <div className = 'main'>
                <PhotoBooth />
                <LoginForm />
                <Register />
                <Home />
            </div>
        );
    }
}

export default Main;