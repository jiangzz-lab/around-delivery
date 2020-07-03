import "antd/dist/antd.css";
import { Input, Col, Row, Form, Radio } from "antd";
import React, {Component} from 'react';

class ShipInfo extends Component {
  constructor({ senderForm, receiverForm, packageForm }) {
    super();
    this.senderForm = senderForm;
    this.receiverForm = receiverForm;
    this.packageForm = packageForm;
  }
  state = {
    value: 1
  };
  SenderInfoForm = () => {
    
    return (
      <>
        <Row gutter={10}>
          <Col span={9} push={3}>
            <Form.Item
              name="Last Name"
              rules={[
                {
                  required: true,
                  message: "Last Name"
                }
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={9} push={3}>
            <Form.Item
              name="First_Name"
              rules={[
                {
                  required: true,
                  message: "First Name"
                }
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={9} push={3}>
            <Form.Item
              name="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Phone Number"
                }
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={9} push={3}>
            <Form.Item
              name="Email Address"
              rules={[
                {
                  required: true,
                  message: "Email Address"
                }
              ]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={18} push={3}>
            <Form.Item
              name="Street_Address_1"
              rules={[
                {
                  required: true,
                  message: "Street Address 1"
                }
              ]}
            >
              <Input placeholder="Street Address 1" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={18} push={3}>
            <Form.Item
              name="Street_Address_2"
              rules={[
                {
                  required: false,
                  message: "Street Address 2"
                }
              ]}
            >
              <Input placeholder="Street Address 2" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={9} push={3}>
            <Form.Item
              name="City"
              rules={[
                {
                  required: true,
                  message: "City"
                }
              ]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={9} push={3}>
            <Form.Item
              name="Zip_Code"
              rules={[
                {
                  required: true,
                  message: "Zip Code"
                }
              ]}
            >
              <Input placeholder="Zip Code" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={9} push={3}>
            <Form.Item
              name="State"
              rules={[
                {
                  required: true,
                  message: "State"
                }
              ]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col span={9} push={3}>
            <Form.Item
              name="Country"
              rules={[
                {
                  required: true,
                  message: "Country"
                }
              ]}
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  ReceiverInfoForm = () => {
      
    return (
      <>
        <Row gutter={10}>
          <Col span={9} push={3}>
            <Form.Item
              name="Receiver Last Name"
              rules={[
                {
                  required: true,
                  message: "Receiver Last Name"
                }
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={9} push={3}>
            <Form.Item
              name="Receiver First_Name"
              rules={[
                {
                  required: true,
                  message: "Receiver First Name"
                }
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={18} push={3}>
            <Form.Item
              name="Receiver Street_Address_1"
              rules={[
                {
                  required: true,
                  message: "Receiver Street Address 1"
                }
              ]}
            >
              <Input placeholder="Street Address 1" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={18} push={3}>
            <Form.Item
              name="Receiver Street_Address_2"
              rules={[
                {
                  required: false,
                  message: "Receiver Street Address 2"
                }
              ]}
            >
              <Input placeholder="Street Address 2" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={9} push={3}>
            <Form.Item
              name="Receiver City"
              rules={[
                {
                  required: true,
                  message: "Receiver City"
                }
              ]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={9} push={3}>
            <Form.Item
              name="Receiver Zip_Code"
              rules={[
                {
                  required: true,
                  message: "Receiver Zip Code"
                }
              ]}
            >
              <Input placeholder="Zip Code" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={9} push={3}>
            <Form.Item
              name="Receiver State"
              rules={[
                {
                  required: true,
                  message: "Receiver State"
                }
              ]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col span={9} push={3}>
            <Form.Item
              name="Receiver Country"
              rules={[
                {
                  required: true,
                  message: "Receiver Country"
                }
              ]}
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  onRadioChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  PackageInfoForm = () => {

    return (
      <>
        <Row gutter={10}>
          <Col span={4} push={3}>
            <Form.Item
              name="Length(cm)"
              rules={[
                {
                  required: true,
                  message: "Length(cm)"
                }
              ]}
            >
              <Input placeholder="Length(cm)" />
            </Form.Item>
          </Col>
          <Col span={4} push={3}>
            <Form.Item
              name="Width(cm)"
              rules={[
                {
                  required: true,
                  message: "Width(cm)"
                }
              ]}
            >
              <Input placeholder="Width(cm)" />
            </Form.Item>
          </Col>
          <Col span={5} push={3}>
            <Form.Item
              name="Height(cm)"
              rules={[
                {
                  required: true,
                  message: "Height(cm)"
                }
              ]}
            >
              <Input placeholder="Height(cm)" />
            </Form.Item>
          </Col>

          <Col span={5} push={3}>
            <Form.Item
              name="Weight(kg)"
              rules={[
                {
                  required: true,
                  message: "Weight(kg)"
                }
              ]}
            >
              <Input placeholder="Weight(kg)" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={5} push={3}>
            <Form.Item
              name="RobotOrDrone"
              rules={[
                {
                  required: true,
                  message: "Robot Or Drone"
                }
              ]}
            >
              <Radio.Group
                onChange={this.onRadioChange}
                value={this.state.value}
              >
                <Radio value={1}>Robot</Radio>
                <Radio value={2}>Drone</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };
    render() {
        return (
            <div>
              <h3>Sender Information</h3>
              <this.SenderInfoForm/>
              <h3>Receiver Information</h3>
              <this.ReceiverInfoForm/>
              <h3>Package Information</h3>
              <this.PackageInfoForm/>
            </div>
        );
    }
}

export default ShipInfo;


