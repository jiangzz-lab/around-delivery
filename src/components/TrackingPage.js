import React, {Component} from 'react';
import { Steps, Icon } from 'antd';

const { Step } = Steps;

const statusString = ['confirmed', 'picked up', 'in transit', 'delivered'];

class TrackingPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            current: 0,
            time: 0,
        }
    }
    // get order information from backend
    componentDidMount() {
        const current = 1;
        const time = 1;
        this.setState({
            current: current,
            time: time,
        })
    }

    render() {
        const { current, time } = this.state;
        // const current = this.props.orderInfo.status;
        // console.log(this.props.orderInfo);
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

        const { match } = this.props;

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
                <p className="delivery-time"> Deliver in {time} hours </p>
            </div>
        );
    }
}

export default TrackingPage;