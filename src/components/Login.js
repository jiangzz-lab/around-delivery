import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';

class LoginForm extends Component {
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
            <Form {...formItemLayout} layout="horizontal" name="register" onFinish={this.handleSubmit} className="login">
                <Form.Item 
                    label="Username"
                    name="Username"
                    rules={[
                        {
                        required: false,
                        message: "Username"
                        }
                    ]}
                    >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item 
                    label="Password" 
                    hasFeedback
                    name="Password"
                    rules={[
                        {
                        required: false,
                        message: "Password"
                        }
                    ]}
                    >
                        <Input placeholder="Password" />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;
