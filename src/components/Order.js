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
        this.shipInfo = React.createRef();
        this.recommendInfo = React.createRef();
    }

    handleShipInfo = () => {
        this.shipInfo.current.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // values contains all data from shipInfo form
                console.log('Received values of form: ', values);
                const { getOrderInfo } = this.props;

                // add several properties which should get from backend in the future
                const newOrderInfo = Object.assign(values, {
                    number: Math.floor(Math.random() * 1000),
                    status: 0,
                    deliveryTime: 2,
                });

                // print out complete order information
                console.log('new order Info -->', newOrderInfo);
                // getOrderInfo(newOrderInfo);
                const current = this.state.current + 1;
                this.setState({current});
            } else {
                message.error('Please enter necessary information!');
            }
        });
    }

    handleRecommendInfo = () => {
        console.log(this.recommendInfo.current);
        this.recommendInfo.current.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of recommend form: ', values);
                const current = this.state.current + 1;
                this.setState({current});
            } else {
                message.error('Please enter necessary information!');
            }
        });
    }

    next() {
        console.log(this.state.current);
        if (this.state.current === 0) {
            this.handleShipInfo();
        }  else if (this.state.current === 1) {
            this.handleRecommendInfo();
        } else {
            const current = this.state.current + 1;
            this.setState({current});
        }
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        /* current notes the current step of the order process*/
        const { current } = this.state;
        /* stepContent is an Array that saves corresponding component to render
         as step content for each step*/
        const stepContent = [<ShipInfo
            ref={this.shipInfo}
            newOrder={this.props.newOrder}
        />, <Recommend
            ref={this.recommendInfo}
        />, <CheckOut />, this.props.newOrder === undefined ?<Confirm /> : <Confirm orderNumber={this.props.newOrder.number}/>];

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