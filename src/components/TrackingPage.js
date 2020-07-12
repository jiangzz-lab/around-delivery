import React, {Component} from 'react';
import { Steps, Icon, Spin } from 'antd';
import axios from 'axios';

const { Step } = Steps;

const statusString = ['confirmed', 'picked up', 'in transit', 'delivered'];

class TrackingPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            current: 0,
            time: 0,
            isLoadingPage: false,
            found: true,
            delivered: false,
            updated: false,
        }
    }

    toggleUpdated = (status) => {
        this.setState({
            updated: status,
        });
    }

    resetTrackingStates = () => {
        this.setState({
            found: true,
            delivered: false,
            updated: false,
            isLoadingPage: true,
        });
    }
    // get order information from backend
    componentDidMount() {
        const statuses = ["Order created!", "Order picked up!", "Order out for delivery!", "Order delivered!"];
        const { match } = this.props;
        axios.post(`http://localhost:5000/tracking`, {
            "tracking_id": match.params.number,
        })
            .then(response => {
                const status = response.data.status;
                const alert = response.data.alert;
                // console.log(status);
                // console.log(alert);
                if (alert !== undefined) {
                    this.setState({
                        found: false,
                        isLoadingPage: false,
                    });
                } else {
                    const current = statuses.findIndex((element) => element === status);
                    this.setState({
                        current : current,
                        isLoadingPage: false,
                        delivered: current === 3 ? true : false,
                    });
                }
                this.toggleUpdated(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidUpdate() {
        const { updated } = this.state;
        if(updated) { return; }
        const statuses = ["Order created!", "Order picked up!", "Order out for delivery!", "Order delivered!"];
        const { match } = this.props;
        axios.post(`http://localhost:5000/tracking`, {
            "tracking_id": match.params.number,
        })
            .then(response => {
                const status = response.data.status;
                const alert = response.data.alert;
               // console.log(status);
               // console.log(alert);
                if (alert !== undefined) {
                    this.setState({
                        found: false,
                        isLoadingPage: false,
                    });
                } else {
                    const current = statuses.findIndex((element) => element === status);
                    this.setState({
                        current : current,
                        isLoadingPage: false,
                        delivered: current === 3 ? true : false,
                    });
                }
                this.toggleUpdated(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { current, time, found ,delivered, isLoadingPage} = this.state;
        const { match } = this.props;
        //const fakeCurrent = match.params.number % 2;

        if (isLoadingPage) {
            return <Spin tip="loading ..."/>;
        }

        if (!found) {
            return <p className="no-order-message"> You dont't have this order! </p>;
        }

        let statusArray = ['wait', 'wait', 'wait', 'wait'];
        for (let i = 0; i < statusArray.length; i++) {
            if (i < current) {
                statusArray[i]  = 'finished';
            } else if (i === current) {
                statusArray[i] = 'process';
            } else {
                statusArray[i] = 'wait';
            }
        }

        console.log('props of TrackingPage -->', this.props);
        console.log('match of TrackingPage -->', this.props.match);

        return (
            <div className="tracking-page">
                <p className="tracking-status"> Your order {match.params.number} is {statusString[current]}! </p>
                <div className="tracking-bar">
                    <Steps>
                        <Step status={statusArray[0]} title="Order Confirmed" icon={<Icon type="solution" />} />
                        <Step status={statusArray[1]} title="Picked up" icon={<Icon type="robot" />} />
                        <Step status={statusArray[2]} title="In transit" icon={<Icon type="loading" />} />
                        <Step status={statusArray[3]} title="Delivered" icon={<Icon type="smile-o" />} />
                    </Steps>
                </div>
                {
                    delivered ? null :
                    <p className="delivery-time"> Deliver in {3 - current * 1} hours </p>
                }
            </div>
        );
    }
}

export default TrackingPage;