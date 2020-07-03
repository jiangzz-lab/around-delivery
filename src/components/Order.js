import React, {Component} from 'react'

import ShipInfo from "./ShipInfo";
import Recommend from "./Recommend";
import CheckOut from "./CheckOut";
import Payment from "./Payment";
import Confirm from "./Confirm";

import { Steps, Button, Form, message } from 'antd';

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
        title: 'Payment',
        content: 'Payment',
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

        this.formData = {}
    }
    next() {
        const current = this.state.current + 1;
        console.log(this.state.current);
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const onFinish = values => {
            console.log("Success:", values);
            this.formData[current] = values;
            console.log("Success stored data:", this.formData);
            
            if (current === steps.length - 1){
                message.success('Processing complete!')
            } else {
                this.next();
            }
            
          };
      
        /*{ current notes the current step of the order process}*/
        const { current } = this.state;
        /*{ stepContent is an Array that saves corresponding component to render
         as step content for each step}*/
        const stepContent = [<ShipInfo senderForm={this.senderForm} reciverForm={this.reciverForm} packageForm={this.packageForm} />, <Recommend />, <CheckOut />, <Payment />, <Confirm />];
        return (
            <Form
            name="orderForm"
            onFinish={onFinish}
            >
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
                    <Form.Item>
                        {current < steps.length - 1 && (
                            <Button htmlType="submit"  type="primary" >
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            
                            <Button htmlType="submit" type="primary" >
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                Back
                            </Button>
                        
                        )}
                    </Form.Item>
                </div>
            </div>
            </Form>
        );
    }
}

export default Order;