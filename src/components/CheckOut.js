import React, {Component} from 'react';
import { Descriptions } from 'antd';

class CheckOut extends Component {
    render() {
        return (
            <div>
                <Descriptions title="Receiver Info">
                    <Descriptions.Item label="Name">haha</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Remark"></Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="Sender Info">
                    <Descriptions.Item label="Name">Your friend</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Email">xxxx@gmail.com</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        1600 Amphitheatre Pkwy, Mountain View, CA 94043
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="Package Info">
                    <Descriptions.Item label="Delivery Time">1h</Descriptions.Item>
                    <Descriptions.Item label="Delivery Fee">$18</Descriptions.Item>
                    <Descriptions.Item label="Carrier"> drone </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default CheckOut;