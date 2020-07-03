import React, {Component} from 'react';
import "antd/dist/antd.css";
import { Col, Row, Form, Radio } from "antd";

class Recommend extends Component {
    RecommandInfoForm = () => {
        const onChange = e => {
          console.log(`radio checked:${e.target.value}`);
        };
    
        const radioStyle = {
          display: "block",
          height: "30px",
          lineHeight: "30px"
        };
    
        const deliveryOptions = [
          { style: radioStyle, content: "Option1: Time, Free, Carrier", value: "option 1" },
          { style: radioStyle, content: "Option2: Time, Free, Carrier", value: "option 2" },
          { style: radioStyle, content: "Option3: Time, Free, Carrier", value: "option 3" }
        ];
        

        return (
          <>
            <Row gutter={10}>
              <Col span={9} push={3}>
                <Form.Item
                  label="Delivery time"
                  name="Delivery time"
                  rules={[
                    {
                      required: true,
                      message: "Delivery time"
                    }
                  ]}
                >
                  <Radio.Group
                    name="Delivery time"
                    onChange={onChange}
                    initialValues="1hr"
                  >
                    <Radio.Button value="1hr">1hr</Radio.Button>
                    <Radio.Button value="5hrs">5hrs</Radio.Button>
                    <Radio.Button value="1day">1day</Radio.Button>
                    <Radio.Button value="5days">5days</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={9} push={3}>
                <Form.Item
                  label="Delivery options"
                  name="Delivery options"
                  rules={[
                    {
                      required: true,
                      message: "Delivery options"
                    }
                  ]}
                >
                  <Radio.Group onChange={this.onChange} initialValues={1}>
                    {deliveryOptions.map(option => (
                      <Radio style={option.style} value={option.value} key={option.value}>
                        {option.content}
                      </Radio>
                    ))}
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
                <this.RecommandInfoForm/>
            </div>
        );
    }
}


export default Recommend;
