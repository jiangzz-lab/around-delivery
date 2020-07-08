import React, {Component} from 'react'
import { Steps, Button, message } from 'antd';
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
        };
        this.shipInfo = React.createRef();
    }

    handleShipInfo = () => {
        this.shipInfo.current.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // values contains all data from shipInfo form
                console.log('Received values of form: ', values);
                const body = JSON.stringify(values);
                console.log(body);
                // get recommendation options form backend
                axios.post(`http://localhost:5000/recommendation`, {
                    "oneAddr": "Google",
                    "twoAddr": "Facebook",
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
                        console.log(recommendations);
                        // Now add the recommendations to orderInfo
                        const updatedOrderInfo = Object.assign(values, {
                            number: Math.floor(Math.random() * 1000),
                            status: 0,
                            recommendations: recommendations,
                        })
                        console.log(updatedOrderInfo);
                        // and update the orderInfo data in this.state
                        this.setState({
                            orderInfo: updatedOrderInfo,
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                const newOrderInfo = Object.assign(values, {
                    // number should come from backend after payment success in the future
                    // status should be set to 0, namely 'confirmed' at this point
                });

                // print out complete order information
                console.log('new order Info -->', newOrderInfo);

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
        console.log('updatedOrderInfo in this.state -->', this.state.orderInfo);
        const { current } = this.state;
        /* stepContent is an Array that saves corresponding component to render
         as step content for each step*/
        const stepContent = [<ShipInfo
            ref={this.shipInfo}
            newOrder={this.props.newOrder}
        />, <Recommend />, <CheckOut />, this.props.newOrder === undefined ?<Confirm /> : <Confirm orderNumber={this.props.newOrder.number}/>];

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