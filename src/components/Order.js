import React, {Component} from 'react'
import { Steps, Button, message, Spin } from 'antd';
import axios from 'axios';


import ShipInfo from "./ShipInfo";
import Recommend from "./Recommend";
import CheckOut from "./CheckOut";
import Confirm from "./Confirm";



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
            orderInfo: {},
            isLoadingOptions: false,
        };
        this.shipInfo = React.createRef();
        this.recommendInfo = React.createRef();
    }

    handleShipInfo = () => {
        this.shipInfo.current.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // get recommendation options form backend
                this.setState({
                    isLoadingOptions : true,
                });
                axios.post(`http://localhost:5000/recommendation`, {
                    "oneAddr": values['sender-address'],
                    "twoAddr": values['receiver-address'],
                    "height" : values['package-height'],
                    "length" : values['package-length'],
                    "width" : values['package-width'],
                    })
                    .then((response) => {
                        const optionResponse = response.data;
                        // It is very awkward to put two pieces of data into one object;
                        // We should receive Json array here in the future;
                        const option1 = {
                            time: optionResponse['Drone Estimated Delivery Time (fastest)'],
                            price: optionResponse['Drone Price (fastest)'],
                            carrier: 'Drone',
                        };
                        const option2 = {
                            time: optionResponse['Robot Estimated Delivery Time (cheapest)'],
                            price: optionResponse['Robot Price (cheapest)'],
                            carrier: 'Robot',
                        }
                        const options = [];
                        const recommendations = options.concat(option1).concat(option2);
                        // Now add the recommendations to orderInfo
                        const updatedOrderInfo = Object.assign(values, {
                            number: Math.floor(Math.random() * 1000),
                            status: 0,
                            recommendations: recommendations,
                        })
                        // and update the orderInfo data in this.state
                        this.setState({
                            orderInfo: updatedOrderInfo,
                            isLoadingOptions: false,
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                const current = this.state.current + 1;
                this.setState({current});
            } else {
                message.error('Please enter necessary information!');
            }
        });
    }

    handleRecommendInfo = () => {
        this.recommendInfo.current.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of recommend form: ', values);
                const { orderInfo } = this.state;
                const current = this.state.current + 1;
                const updatedOrderInfo = Object.assign(orderInfo, values);
                this.setState({
                    current: current,
                    orderInfo : updatedOrderInfo,
                });
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

    renderShipInfo = () => {
            return <ShipInfo
                ref={this.shipInfo}
            />;
    }

    renderRecommend = () => {
        if (this.state.isLoadingOptions) {
            return <Spin tip="We are getting the best solutions for you ..."/>
        } else {
            console.log(this.state.orderInfo.recommendations)
            return <Recommend
                ref={this.recommendInfo}
                options={this.state.orderInfo.recommendations}
            />;
        }
    }

    renderCheckout = () => {
        return <CheckOut orderInfo={this.state.orderInfo}/>;
    }

    renderConfirm = () => {
        return <Confirm />;
    }

    renderStepContent = (current) => {
        console.log('step -->', current);
        console.log('this.state.orderInfo', this.state.orderInfo);
        const stepContent = [this.renderShipInfo, this.renderRecommend, this.renderCheckout, this.renderConfirm];
        return stepContent[current]();
    }

    render() {
        /* current notes the current step of the order process*/
        console.log('updatedOrderInfo in this.state -->', this.state.orderInfo);
        const { current } = this.state;
        /* stepContent is an Array that saves corresponding component to render
         as step content for each step*/
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
                    {this.renderStepContent(current)}
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