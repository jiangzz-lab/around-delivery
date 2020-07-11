import React, {Component} from 'react';
import { Carousel } from 'antd';
import logo from '../assets/images/logo.svg';
import robot1 from '../assets/images/robot1.jpg';
import robot2 from '../assets/images/robot2.jpeg';
import drone1 from '../assets/images/drone1.jpg';

class PhotoBooth extends Component {
    render() {
        return (
            <Carousel autoplay>
                <div>
                    <img src={drone1} alt="logo" className="photos"/>
                </div>
                {/*<div>*/}
                {/*    <img src={robot1} alt="logo" className="photos"/>*/}
                {/*</div>*/}
                <div>
                    <img src={robot2} alt="logo" className="photos"/>
                </div>
            </Carousel>
        );
    }
}

export default PhotoBooth;