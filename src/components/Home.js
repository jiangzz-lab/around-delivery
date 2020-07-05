import React, {Component} from 'react';

import Order from "./Order";

import TrackingPage from "./TrackingPage";
import {Button, Icon, Modal, message} from "antd";
import SearchBar from "./SearchBar";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderToTrack: 0,
            display:"null",
        }
    }

    setDisplay = (display) => {
        this.setState({
            display: display
        })
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
                if (orderList.length === 0) { return <p>You have no order to track!</p>; }
                // console.log('when render tracking -->', this.state.orders);
                if (orderToTrack === undefined) { return <p> You don't have this order! </p>; }
                return <TrackingPage
                        orderInfo={this.state.orders[this.state.orderToTrack]}
                        />;
            case "order":
                const length = orderList.length;
                return length === 0 ? <Order getOrderInfo={this.getOrderInfo} newOrder={undefined}/>
                   : <Order getOrderInfo={this.getOrderInfo} newOrder={orderList[length - 1]} />;
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

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
        let orderToTrack;
        for (let i = 0; i < orderList.length; i++) {
            console.log(value);
            console.log(i);
            console.log(orderList[i]['number']);
            if (orderList[i]['number'] === Number(value)){
                orderToTrack = i;
            } else {
                orderToTrack = undefined;
            }
        }
        this.setState({
            visible: false,
            orderToTrack: orderToTrack,
            display: 'tracking',
        });
    };

    handleClose = () => {
        console.log('when close the search bar -->', this.state.orders);
    }

    render() {
        return (
            <div>
                <header className="welcome-message">
                    Good Evening! What do you want to do today?
                </header>
                <div className="home-action">
                    <Button className="tracking-button" type="primary" onClick={this.showModal}>
                        <Icon type="search" /> Track My Package
                    </Button>
                    <Modal
                        title="Enter your order number:"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        afterClose={this.handleClose}
                        footer={null}
                    >
                        <SearchBar handleSearch={this.handleSearch}/>
                    </Modal>
                    <Button
                        type="primary"
                        className="new-order-button"
                        onClick={() => {this.setDisplay("order")}}
                    >
                        <Icon type="plus" /> Create New Order
                    </Button>
                </div>
                {
                    this.renderBody()
                }
            </div>
        );
    }
}

export default Home;