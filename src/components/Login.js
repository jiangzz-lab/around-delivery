import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
// import { API_ROOT} from "../constants";

class LoginForm extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(this.props.form);

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
                        getFieldDecorator('username', {
                            rules: [
                                { required: true, message: 'Please input your username!'}
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {
                        getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input your password!'}
                            ]
                        })(<Input.Password />)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button> Or go to <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        // console.log(this.props.form);
        // console.log(this.props.form.getFieldsValue());
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // fetch(`${API_ROOT}/login`, {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         username: values.username,
                //         password: values.password,
                //     }),
                // })
                //     .then((response) => {
                //         if (response.ok) {
                //             return response.text();
                //         }
                //         throw new Error(response.stateText);
                //     })
                //     .then((data) => {
                //         console.log(data);
                //         this.props.handleLoginSucceed(data);
                //         message.success('Login succeed!');
                //     })
                //     .catch((err) => {
                //         console.error(err);
                //         message.error('Login failed.');
                //     });
            }
        });
    };
}

const Login = Form.create({ name: 'register' })(LoginForm);

export default Login;
