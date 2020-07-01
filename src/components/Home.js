import React, {Component} from 'react';

import Order from "./Order";

import TrackingPage from "./TrackingPage";
import {Button, Icon, Modal} from "antd";
import SearchBar from "./SearchBar";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: {
                number: "1234",
                status: 1,
                deliveryTime: 1,
            },
            display:"null",
        }
    }

    setDisplay = (display) => {
        this.setState({
            display: display
        })
    }

    renderBody = () => {
        switch(this.state.display) {
            case "null" :
                return null;
            case "tracking":
                return <TrackingPage
                        orderInfo={this.state.orderInfo}
                        />;
            case "order":
                return <Order />;
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
        this.setState({
            orderInfo: {
                number : value,
                status : 1,
                deliveryTime: 1,
            },
            visible: false,
        });
        this.setDisplay("tracking");
    };

    handleClose = () => {
        console.log(this.state.orderInfo);
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