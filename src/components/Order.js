import React, {Component} from 'react'

import ShipInfo from "./ShipInfo";
import Recommend from "./Recommend";
import CheckOut from "./CheckOut";
import Confirm from "./Confirm";

import { Steps, Button, message } from 'antd';

const { Step } = Steps;

const steps = [
    {
        title: 'Shipping information',
        content: 'Information',
    },
    {
        title: 'Select solution',
        content: 'Select',
    },
    {
        title: 'Review & Check out',
        content: 'Review',
    },
    {
        title: 'Confirmation',
        content: 'Confirmation'
    }
];

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        {/* current notes the current step of the order process*/}
        const { current } = this.state;
        {/* stepContent is an Array that saves corresponding component to render
         as step content for each step*/}
        const stepContent = [<ShipInfo />, <Recommend />, <CheckOut />, <Confirm />];
        return (
            <div>
                <div className="order-steps">
                    <Steps current={current} >
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />))}
                    </Steps>
                </div>
                {/* This is the place to render content for the current step;
                    it could be ShipInfo, Recommend etc according to the value of current*/}
                <div className="steps-content">
                    {stepContent[current]}
                </div>

                <div className="steps-action">
                    {current > 0 && (
                        <Button className='back-button' style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Back
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button className='next-button' type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button className='done-button' type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default Order;