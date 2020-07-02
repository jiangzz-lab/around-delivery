import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';

class RegistrationForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;

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
<<<<<<< HEAD
            <div>
            </div>
=======
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register">
                <Form.Item label="Username">
                    {
                        getFieldDecorator('Username', {})(<Input />)
                    }
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {
                        getFieldDecorator('Password', {
                            rule: [
                                {
                                    validator: this.validateToNextPassword,
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
                                    message: 'Please verify your Password'
                                }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
            
>>>>>>> 9b538fecadf18e504d2a99ef6814b92dd90564bf
        );
    }
}

const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register;