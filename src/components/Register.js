import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
// import { API_ROOT} from "../constants";
import axios from 'axios';

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

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
                <Form.Item label="password" hasFeedback>
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                },
                                {
                                    validator: this.validateToNextPassword,
                                }
                            ],
                        })(<Input.Password />)
                    }
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {
                        getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please verify your password'
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)
                    }
                </Form.Item>
                <Form.Item label="Last name">
                    {
                        getFieldDecorator('last_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Last name'
                                }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="First name">
                    {
                        getFieldDecorator('first_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your First name'
                                }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="Email Address">
                    {
                        getFieldDecorator('email_address', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Email Address'
                                }
                            ]
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="Phone number">
                    {
                        getFieldDecorator('phone_number', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Phone number'
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

    validateToNextPassword = (rule, value, callback) => {
        // console.log("password rule", rule);
        // console.log("password value", value);
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback) => {
        // console.log("confirm rule", rule);
        // console.log("confirm value",value);
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        // console.log(this.props.form);
        // console.log(this.props.form.getFieldsValue());
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post(`http://localhost:5000/login`, {
                        // username: values.username,
                        // password: values.password,
                    "user_id": values['username'],
                    "password": values['password'],
                    "last_name":values['last_name'],
                    "first_name":values["first_name"],
                    "email_address":values["email_address"],
                    "phone_number":values["phone_number"]
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text();
                        }
                        //throw new Error(response.stateText);
                    })
                    .then((data) => {
                        console.log(data);
                        console.log(this.props.history);
                        // this.props.history.push('/login');
                        // message.success('Register succeed!');
                    })
                // fetch(`${API_ROOT}/signup`, {
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
                //         this.props.history.push('/login');
                //         message.success('Register succeed!');
                //     })
            }
        });
    };
}

const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register;
