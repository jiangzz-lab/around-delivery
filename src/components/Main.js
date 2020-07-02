import React, {Component} from 'react';

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import PhotoBooth from "./PhotoBooth";

class Main extends Component {
    render() {
        return (
            <div className = 'main'>
                <PhotoBooth />
                <Login />
                <Register />
                <Home />
            </div>
        );
    }
}

export default Main;