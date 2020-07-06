import React, {Component} from 'react';

import Order from "./Order";

import TrackingPage from "./TrackingPage";
import Tracking from './Tracking';

import { Button, Icon, Modal, message } from "antd";
import { Link, Route } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderToTrack: 0,
        }
    }

    getOrderInfo = (newOrder) => {
        let currentOrderList = this.state.orders.slice();
        const newOrderList = currentOrderList.concat(newOrder);
       // console.log('new orderList -->', newOrderList);
        this.setState({
            orders: newOrderList,
        })
    }

    renderBody = () => {
        const orderList = this.state.orders;
        const { orderToTrack } = this.state;
        switch(this.state.display) {
            case "null" :
                return null;
            case "tracking":
                if (orderList.length === 0) { return <p className='tracking-status'>You have no order to track!</p>; }
                // console.log('when render tracking -->', this.state.orders);
                if (orderToTrack === undefined) { return <p className='tracking-status'> You don't have this order! </p>; }
                return <TrackingPage
                        orderInfo={this.state.orders[this.state.orderToTrack]}
                        />;
            case "order":
                const length = orderList.length;
                return length === 0 ? <Order getOrderInfo={this.getOrderInfo} newOrder={undefined}/>
                   : <Order getOrderInfo={this.getOrderInfo} newOrder={orderList[length - 1]} />;
        }
    }

    renderTracking = () => {
        // const orderList = this.state.orders;
        // const { orderToTrack } = this.state;
        // if (orderList.length === 0) { return <p className='tracking-status'>You have no order to track!</p>; }
        // console.log('when render tracking -->', this.state.orders);
        // if (orderToTrack === undefined) { return <p className='tracking-status'> You don't have this order! </p>; }
        return <Tracking
            orderInfo={this.state.orders}
            handleSearch={this.handleSearch}
        />;
    }

    renderOrder = () => {
        const orderList = this.state.orders;
        const length = orderList.length;
        return length === 0 ? <Order getOrderInfo={this.getOrderInfo} newOrder={undefined}/>
            : <Order getOrderInfo={this.getOrderInfo} newOrder={orderList[length - 1]} />;
    }

    handleSearch = value => {
        if (value === "") {
            message.warning({
                content: 'Please enter your order number!',
                className: 'tracking-warning',
                style: {
                    fontSize: "large"
                },
            });
            return;
        }
        const orderList = this.state.orders;
        let orderToTrack = undefined;
        for (let i = 0; i < orderList.length; i++) {
            if (orderList[i]['number'] === Number(value)){
                orderToTrack = i;
                break;
            }
            orderToTrack = undefined;
        }
        this.setState({
            orderToTrack: orderToTrack,
            display: 'tracking',
        });
    };

    handleClose = () => {
        console.log('when close the search bar -->', this.state.orders);
    }

    render() {
        console.log(this.props);
        const { match } = this.props;
        console.log(match);
        return (
            <div>
                <header className="welcome-message">
                    Good Evening! What do you want to do today?
                </header>
                <div className="home-action">
                    <Link to={`${match.url}/tracking`}>
                        <Button className="tracking-button" type="primary">
                            <Icon type="search" /> Track My Package
                        </Button>
                    </Link>

                    <Link to={`${match.url}/order`}>
                        <Button
                        type="primary"
                        className="new-order-button"
                        >
                        <Icon type="plus" /> Create New Order
                    </Button>
                    </Link>
                </div>

                <Route path={`${match.url}/tracking`} component={Tracking} />
                <Route path={`${match.url}/order`} render={this.renderOrder} />
            </div>
        );
    }
}

export default Home;