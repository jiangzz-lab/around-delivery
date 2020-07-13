import React, {Component} from 'react';
import { Result, Icon, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import  axios  from 'axios';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirming: true,
        }
    }

    componentDidMount() {
        const { orderInfo } = this.props;
        const { recommendations } = this.props.orderInfo;
        const option = this.props.orderInfo['delivery-option'];
        console.log('orderInfo before confirm -->', orderInfo);
        console.log('recommendations -->', recommendations);
        console.log('option --->', option);
        console.log('delivery time -->', recommendations[option]['time']);

        axios.post( 'http://localhost:5000/neworder', {
            "senderFisrtName": orderInfo['sender-first-name'],
        "senderLastName": orderInfo['sender-last-name'],
        "senderAddress": orderInfo['senderAddress'],
        "senderPhoneNumber": orderInfo['sender-phone-number'],
        "senderEmail": orderInfo['sender-email'],
        "recipentFisrtName": orderInfo['receiver-first-name'],
        "recipentLastName": orderInfo['receiver-first-name'],
        "recipentAddress": orderInfo['receiverAddress'],
        "recipentPhoneNumber": orderInfo['receiver-phone-number'],
        "recipentEmail": orderInfo['receiver-email'],
        "packageWeight" : orderInfo['package-weight'],
        "packageHeight" : orderInfo['package-height'],
        "packageLength" : orderInfo['package-length'],
        "packageWidth" : orderInfo['package-width'],
        "carrier" : recommendations[option]['carrier'],
            "totalCost" : recommendations[option]['price'],
            "deliveryTime": recommendations[option]['time'].concat('hr'),
    })
            .then((response) => {
                console.log('response from /neworder -->', response.data);
                const trackingID = response.data['tracking id'];
                if(trackingID) {
                    this.setState({
                        trackingID : trackingID,
                        isConfirming: false,
                    });
                }
            })
            .catch(error => {
             console.log(error);
            });
    }

    render() {
        console.log(this.props.orderInfo);
        const { isConfirming, trackingID } = this.state;
        if (isConfirming) {
            return <Spin tip="Finishing your order ..." />;
        }
        return (
            <Result
                icon={<Icon type="smile" theme="twoTone" />}
                title={`Great, your order ${trackingID} is placed!`}
                extra={<Link to={`/home/tracking/${trackingID}`}><Button type="primary">Tracking</Button></Link>}
            />
        );
    }
}

export default Confirm;