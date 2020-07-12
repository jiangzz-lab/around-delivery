import React, {Component} from 'react';
import {Col, Form, Input} from "antd";

class AddressUpdateForm extends Component {
    render() {
        const { senderAddressValid, receiverAddressValid } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='address-update-form'>
                <Form
                    name="addressForm"
                >
                    {
                        senderAddressValid ? null :

                            <Form.Item
                                name="sender-address"
                            >
                                <h3>The sender address is not valid, please update below:</h3>
                                {getFieldDecorator(
                                    'senderAddress', {
                                        rules : [
                                            {
                                                required: true,
                                                message: 'Please update your address!',
                                            },
                                        ],
                                    }
                                )(<Input placeholder="Sender Address" />)}
                            </Form.Item>
                    }
                    {
                        senderAddressValid ? null :
                            <Form.Item
                                name="Zip_Code"
                            >
                                {getFieldDecorator('sender-zip-code', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please enter your zip code!",
                                        }
                                    ],
                                }) (<Input placeholder="Zip code" />)}
                            </Form.Item>
                    }
                    {
                        receiverAddressValid ? null :
                            <Form.Item
                                name="receiver-address"
                            >
                                <h3>The recipient address is not valid, please update below:</h3>
                                {getFieldDecorator(
                                    'receiverAddress', {
                                        rules : [
                                            {
                                                required: true,
                                                message: 'Please update your address!',
                                            },
                                        ],
                                    }
                                )(<Input placeholder="Recipient Address" />)}
                            </Form.Item>
                    }
                    {
                        receiverAddressValid ? null :
                            <Form.Item
                                name="Zip_Code"
                            >
                                {getFieldDecorator('receiver-zip-code', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please enter your zip code!",
                                        }
                                    ],
                                }) (<Input placeholder="Zip code" />)}
                            </Form.Item>
                    }
                </Form>
            </div>
        );
    }
}

const AddressUpdate = Form.create()(AddressUpdateForm);
export default AddressUpdate;