import React, {Component} from 'react'
import { Steps, Button, message, Spin } from 'antd';
import axios from 'axios';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';


import ShipInfo from "./ShipInfo";
import AddressUpdate from "./AddressUpdate";
import Recommend from "./Recommend";
import CheckOut from "./CheckOut";
import Payment from "./Payment";
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
        title: 'Payment',
        content: 'Payment'
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
            shipInfoDisplay: 'initial',
            toCollectShipInfo: true,
            toUpdateAddress: false,
            isLoadingOptions: false,

            isProcessingPayment: false,
            addressesValid: false,
            addressValidStatus: {
                senderAddressValid: false,
                receiverAddressValid: false,
            }
        };
        this.shipInfo = React.createRef();
        this.addressUpdate = React.createRef();
        this.recommendInfo = React.createRef();
        this.payRef = React.createRef();
    }

    validateAddress = () => {
        // validate address
        const { orderInfo } = this.state;
        axios.post(`http://localhost:5000/validaddr`, {
            "senderAddr": orderInfo['senderAddress'],
            "receiverAddr": orderInfo['receiverAddress'],
        })
            .then((response) => {
                console.log('response from 5000 validaddr -->', response.data);
                const addressStatus = response.data;
                if (addressStatus['SenderAddrStatus'] === "Valid" && addressStatus['ReceiverAddrStatus'] === "Valid") {
                    const updatedOrderInfo = Object.assign(orderInfo,{
                        senderAddress: addressStatus['SenderAddress'],
                        receiverAddress: addressStatus['ReceiverAddress'],
                    });

                    // if already valid, jump to next step and reinitialize addressValidStatus
                    // as well as display setting
                    const current = this.state.current + 1;
                    this.setState({
                        orderInfo: updatedOrderInfo,
                        current: current,
                        addressValidStatus: {
                            senderAddressValid: false,
                            receiverAddressValid: false,
                        },
                        toCollectShipInfo: true,
                        toUpdateAddress: false,
                        shipInfoDisplay: 'initial',
                        isLoadingOptions: true,
                    })
                } else {
                    // if not all valid, save the valid/invalid status
                    // switch the display to AddressUpdate page
                    this.setState({
                        addressValidStatus: {
                            senderAddressValid: addressStatus['SenderAddrStatus'] === "Valid",
                            receiverAddressValid: addressStatus['ReceiverAddrStatus'] === "Valid",
                        },
                        toCollectShipInfo: false,
                        toUpdateAddress: true,
                        shipInfoDisplay: 'update',
                    })
                }
            })
            .catch((error) => {
                console.log('error from 5000 validaddr -->', error);
            })
    }

    handleShipInfo = (event) => {
            event.preventDefault();
            const { toCollectShipInfo, toUpdateAddress, orderInfo } = this.state;
            const { senderAddressValid, receiverAddressValid } = this.state.addressValidStatus;
            if (toCollectShipInfo) {
                this.shipInfo.current.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        // collect address information and validate addresses
                        const formalizedAddresses = {
                            senderAddress: values['senderAddress'] + ', CA, ' + values['sender-zip-code'],
                            receiverAddress: values['receiverAddress'] + ', CA, ' + values['receiver-zip-code'],
                        }
                        console.log('formalized address -->', formalizedAddresses);

                        const orderInfo = Object.assign({}, values, formalizedAddresses);
                        this.setState({
                            toCollectShipInfo: false,
                            orderInfo: orderInfo,
                            shipInfoDisplay: 'processing',
                        });
                    } else {
                        message.error('Please enter necessary information!');
                    }
                })
            } else if (toUpdateAddress) {
                const { orderInfo, } = this.state;
                this.addressUpdate.current.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        // collect updated addresses from addressUpdateForms
                        const formalizedAddresses = {
                            senderAddress: senderAddressValid ? orderInfo['senderAddress']
                                : values['senderAddress'] + ', CA, ' + values['sender-zip-code'],
                            receiverAddress: receiverAddressValid ? orderInfo['receiverAddress']
                                : values['receiverAddress'] + ', CA, ' + values['receiver-zip-code'],
                        }
                        console.log('updated address -->', formalizedAddresses);

                        const updatedOrderInfo = Object.assign(orderInfo, formalizedAddresses);
                        this.setState({
                            orderInfo: updatedOrderInfo,
                            shipInfoDisplay: 'processing',
                        });
                    } else {
                        message.error('Please enter necessary information!');
                    }
                })
            }
    }

    getRecommendation = () => {

        console.log('We are ready to get recommendations!');
        console.log('orderInfo before send to recommendation -->', this.state.orderInfo);

        // get recommendations
        const { orderInfo } =  this.state;
        axios.post(`http://localhost:5000/recommendation`, {
            "senderAddr": orderInfo['senderAddress'],
            "receiverAddr": orderInfo['receiverAddress'],
            "height" : orderInfo['package-height'],
            "length" : orderInfo['package-length'],
            "width" : orderInfo['package-width'],
            "weight" : orderInfo['package-weight'],
        })
            .then((response) => {
                // It is very awkward to put two pieces of data into one object;
                // We should receive Json array here in the future;
                const recommendations = response.data;
                console.log(recommendations);
                // Now add the recommendations to orderInfo
                const updatedOrderInfo = Object.assign(orderInfo, {
                    number: 456,
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
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { current, isLoadingOptions } = this.state;
        const { shipInfoDisplay } = this.state;
        if (current === 0 && shipInfoDisplay === 'processing') {
            const { senderAddressValid, receiverAddressValid } = this.state.addressValidStatus;
            if (!(senderAddressValid && receiverAddressValid)){
                this.validateAddress();
            }
        } else if (current === 1 && isLoadingOptions) {
            this.getRecommendation();
        }
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

    togglePaymentStatus = (status) => {
        this.setState({
            isProcessingPayment: status,
        });
    }

    moveNext = () => {
        this.setState((state) => ({
            current: state.current + 1,
        }))
    }

    handlePay = (event) => {
        console.log('payment -->', this.state.isProcessingPayment);
        console.log(this.payRef.current);
        console.log(this.payRef.current.handlePay);
        this.payRef.current.handlePay(event);
        // const current = this.state.current + 1;
        // this.setState({
        //    current: current,
        // })
    }

    next = (event) => {
        console.log(this.state.current);
        if (this.state.current === 0) {
            this.handleShipInfo(event);
        }  else if (this.state.current === 1) {
            this.handleRecommendInfo(event);
        } else if (this.state.current === 3) {
            this.handlePay(event);
        }
        else {
            const current = this.state.current + 1;
            this.setState({current});
        }
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    renderShipInfo = () => {
        const { shipInfoDisplay } = this.state;
        const { senderAddressValid, receiverAddressValid } = this.state.addressValidStatus;

        switch (shipInfoDisplay) {
            case 'initial':
                return <ShipInfo
                    ref={this.shipInfo}
                />;
            case 'processing':
                return <Spin tip="Processing ..."/>;
            case 'update':
                return <AddressUpdate
                    ref={this.addressUpdate}
                    senderAddressValid={senderAddressValid}
                    receiverAddressValid={receiverAddressValid}
                />;
        }
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

    renderPayment = () => {
        const  recommendations = this.state.orderInfo['recommendations'];
        const  option = this.state.orderInfo['delivery-option'];
        const stripePromise = loadStripe("pk_test_51H347oGW9FfdIurDNI4Kl7mFH1Wj8i0ToP1cYb90pUsAujhUt4kl6G6nALtY4sv0Y0hyCFuuE3EV322uqyetXuo400GeHb9dUo");
        return <Elements stripe={stripePromise}><Payment
            ref={this.payRef}
            togglePaymentStatus={this.togglePaymentStatus}
            moveNext={this.moveNext}
            price={recommendations[option]['price']}
            isProcessingPayment={this.state.isProcessingPayment}
        /></Elements>;
    }

    renderConfirm = () => {
        return <Confirm orderInfo={this.state.orderInfo}/>;
    }

    renderStepContent = (current) => {
        console.log('step -->', current);
        console.log('this.state.orderInfo', this.state.orderInfo);
        const stepContent =
            [
                this.renderShipInfo,
                this.renderRecommend,
                this.renderCheckout,
                this.renderPayment,
                this.renderConfirm
            ];
        return stepContent[current]();
    }

    render() {
        /* current notes the current step of the order process*/
        console.log('updatedOrderInfo in this.state -->', this.state.orderInfo);
        //console.log('orderInfo length -->', Object.keys(this.state.orderInfo).length);
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
                        <Button className='next-button' type="primary" onClick={(event) => this.next(event)}>
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