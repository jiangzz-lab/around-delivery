import React, {Component} from 'react';
import { Result, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

class Confirm extends Component {
    render() {
        console.log(this.props.orderInfo);
        const { number } = this.props.orderInfo;
        return (
            <Result
                icon={<Icon type="smile" theme="twoTone" />}
                title={`Great, your order ${number} is placed!`}
                extra={<Link to={`/home/tracking/${number}`}><Button type="primary">Tracking</Button></Link>}
            />
        );
    }
}

export default Confirm;