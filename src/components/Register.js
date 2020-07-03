import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';

class RegistrationForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} name="register" className="register">
                <Form.Item label="Username">
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item label="Password" hasFeedback
                    rules={[
                        {
                        validator: this.validateToNextPassword,
                        }
                    ]}
                    >
                        <Input placeholder="Password" />
                </Form.Item>
                <Form.Item 
                    label="Confirm Password" 
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please verify your Password'
                        }
                    ]}
                >
                    <Input placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Register = RegistrationForm;

export default Register;
