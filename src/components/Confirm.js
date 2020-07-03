import React, {Component} from 'react';
import { Result, Icon, Button } from 'antd';

class Confirm extends Component {
    render() {
        return (
            <Result
                icon={<Icon type="smile" theme="twoTone" />}
                title="Great, Your order is placed!"
                extra={<Button type="primary">Next</Button>}
            />
        );
    }
}

export default Confirm;