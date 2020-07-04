import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
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
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login">
                <Form.Item label="Username">
                    {
                        getFieldDecorator('Username', {})(<Input />)
                    }
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {
                        getFieldDecorator('Password', {})(<Input />)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Link to="/home">
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Link>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        );
    }
}

const Login = Form.create({ name: 'register' })(LoginForm);

export default Login;
