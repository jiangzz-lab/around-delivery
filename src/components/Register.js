import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

class RegistrationForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props.form);

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
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register">
                <Form.Item label="Username">
                    {
                        getFieldDecorator('Username', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username'
                                }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {
                        getFieldDecorator('Password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {
                        getFieldDecorator('Confirm Password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please verify your password'
                                }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <p> I already have an account, go back to <Link to="/login">Login</Link></p>
                </Form.Item>
            </Form>
        );
    }
}

const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register;
