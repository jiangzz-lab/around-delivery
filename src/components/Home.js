import React, {Component} from 'react';
import Order from "./Order";
import Tracking from "./Tracking";
import SearchBar from "./SearchBar";

class Home extends Component {
    render() {
        return (
            <div>
                <Order />
                <Tracking />
            </div>
        );
    }
}

export default Home;