import React, {Component} from 'react';

import TopBar from "./TopBar";
import Main from "./Main";
//import payment_img from "../assets/images/paymentBG.jpg"

class App extends Component {
    // state = {
    //     isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
    // }
    //
    // handleLoginSucceed = (token) => {
    //     console.log('token --- ', token)
    //     localStorage.setItem(TOKEN_KEY, token)
    //     this.setState({ isLoggedIn: true });
    // }
    //
    // handleLogout = () => {
    //     localStorage.removeItem(TOKEN_KEY);
    //     this.setState({ isLoggedIn: false });
    // }

  render() {
    return (
        <div className="App">
            <TopBar
                // handleLogout={this.handleLogout}
                // isLoggedIn={this.state.isLoggedIn}
            />
            <Main
                // handleLoginSucceed={this.handleLoginSucceed}
                // isLoggedIn={this.state.isLoggedIn}
            />
        </div>  );
  }
}

export default App;
