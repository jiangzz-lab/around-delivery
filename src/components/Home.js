import React, {Component} from 'react';

import Order from "./Order";

import Tracking from './Tracking';

import { Button, Icon } from "antd";
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

    renderOrder = () => {
        const orderList = this.state.orders;
        const length = orderList.length;
        return length === 0 ? <Order getOrderInfo={this.getOrderInfo} newOrder={undefined}/>
            : <Order getOrderInfo={this.getOrderInfo} newOrder={orderList[length - 1]} />;
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