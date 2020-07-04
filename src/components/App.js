import React, {Component} from 'react';

import TopBar from "./TopBar";
import Main from "./Main";
import payment_img from "../assets/images/paymentBG.jpg"


class App extends Component {
  render() {
    return (
        <div className="App">
            <TopBar />
            <Main />
            
        </div>  );
  }
}

export default App;
