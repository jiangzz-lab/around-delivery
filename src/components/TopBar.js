import React, {Component} from 'react';
import logo from '../assets/images/logo.svg';

class TopBar extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} alt="logo" className="App-logo"/>
                <span className="App-title">Around Delivery</span>
            </header>
        );
    }
}

export default TopBar;