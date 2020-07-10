import React, {Component} from 'react';
import { Descriptions } from 'antd';
import Payment from "./Payment";

class CheckOut extends Component {
    render() {
        const { orderInfo } = this.props;
        return (
            <div>
                <Descriptions title="Receiver Info">
                    <Descriptions.Item label="Name">{orderInfo['receiver-first-name'] + orderInfo['receiver-last-name']}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">{orderInfo['receiver-phone-number']}</Descriptions.Item>
                    <Descriptions.Item label="Email">{orderInfo['receiver-email']}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {orderInfo['receiver-address']}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="Sender Info">
                    <Descriptions.Item label="Name">{orderInfo['sender-first-name'] + orderInfo['sender-last-name']}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">{orderInfo['sender-phone-number']}</Descriptions.Item>
                    <Descriptions.Item label="Email">{orderInfo['sender-email']}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {orderInfo['sender-address']}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="Package Info">
                    <Descriptions.Item label="Delivery Time">{orderInfo['recommendations'][orderInfo['delivery-option']]['time']}hrs</Descriptions.Item>
                    <Descriptions.Item label="Delivery Fee">${orderInfo['recommendations'][orderInfo['delivery-option']]['price']}</Descriptions.Item>
                    <Descriptions.Item label="Carrier">{orderInfo['recommendations'][orderInfo['delivery-option']]['carrier']}</Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default CheckOut;