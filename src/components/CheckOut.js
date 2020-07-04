import React, {Component} from 'react';
import { Descriptions } from 'antd';

class CheckOut extends Component {
    render() {
        return (
            <div>
                <Descriptions title="Receiver Info">
                    <Descriptions.Item label="Name">Apple</Descriptions.Item>
                    <Descriptions.Item label="Telephone">xxxxxxxxxx</Descriptions.Item>
                    <Descriptions.Item label="Remark"></Descriptions.Item>
                    <Descriptions.Item label="Address">
                        One Apple Park Way, Cupertino, CA 95014
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="Sender Info">
                    <Descriptions.Item label="Name">Google</Descriptions.Item>
                    <Descriptions.Item label="Telephone">xxxxxxxx</Descriptions.Item>
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