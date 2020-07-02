import React, {Component} from 'react';
import { Steps, Icon } from 'antd';

const { Step } = Steps;
const steps = [
    {
        title: 'Order confirmed',
        content: 'confirmed',
    },
    {
        title: 'Picked up',
        content: 'picked up',
    },
    {
        title: 'In transit',
        content: 'in transit',
    },
    {
        title: 'Delivered',
        content: 'delivered',
    },
];

const statusString = ['confirmed', 'picked up', 'in transit', 'delivered'];

class TrackingPage extends Component {
    render() {
        const current = this.props.orderInfo.status;
        console.log(this.props.orderInfo);
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

        return (
            <div className="tracking-page">
                <p className="tracking-status"> Your order {this.props.orderInfo.number} is {statusString[current]}! </p>
                <div className="tracking-bar">
                    <Steps>
                        <Step status={statusArray[0]} title="Order Confirmed" icon={<Icon type="solution" />} />
                        <Step status={statusArray[1]} title="Picked up" icon={<Icon type="robot" />} />
                        <Step status={statusArray[2]} title="In transit" icon={<Icon type="loading" />} />
                        <Step status={statusArray[3]} title="Delivered" icon={<Icon type="smile-o" />} />
                    </Steps>
                </div>
                <p className="delivery-time"> Deliver in {this.props.orderInfo.deliveryTime} hours </p>
            </div>
        );
    }
}

export default TrackingPage;