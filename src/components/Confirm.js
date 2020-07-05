import React, {Component} from 'react';
import { Result, Icon, Button } from 'antd';

class Confirm extends Component {
    render() {
        return (
            <Result
                icon={<Icon type="smile" theme="twoTone" />}
                title={`Great, your order ${this.props.orderNumber} is placed!`}
                extra={<Button type="primary">Tracking</Button>}
            />
        );
    }
}

export default Confirm;