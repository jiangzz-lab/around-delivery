import React, {Component} from 'react';
import { Carousel } from 'antd';
import logo from '../assets/images/logo.svg';

class PhotoBooth extends Component {
    render() {
        return (
            <Carousel autoplay>
                <div>
                    <img src={logo} alt="logo" className="photos"/>
                    <h3> Photo 1 </h3>
                </div>
                <div>
                    <img src={logo} alt="logo" className="photos"/>
                    <h3>Photo 2</h3>
                </div>
                <div>
                    <img src={logo} alt="logo" className="photos"/>
                    <h3>Photo 3</h3>
                </div>
            </Carousel>
        );
    }
}

export default PhotoBooth;