import "antd/dist/antd.css";
import { Input, Col, Row, Form, Radio } from "antd";
import React, {Component} from 'react';

class ShipInfoForm extends Component {
  state = {
    value: 1
  };

  onRadioChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

   render() {
       const { getFieldDecorator } = this.props.form;
       const { newOrder } = this.props;
     return (
         <Form
             name="ShipInfoForm"
         >
           <h3>Sender Information</h3>
           <Row gutter={10}>
             <Col style={{ height: '50px' }} span={9} push={3}>
               <Form.Item
                   name="sender-last-name"
               >
                   {getFieldDecorator(
                       'sender-last-name', {
                           rules : [
                               {
                                   required: true,
                                   message: 'Please input your last name!',
                               },
                           ],
                         initialValue: newOrder === undefined ? undefined : newOrder['sender-last-name'],
                       }
                   )(<Input placeholder="Last Name" />)}
               </Form.Item>
             </Col>
             <Col style={{ height: '50px' }}  span={9} push={3}>
               <Form.Item
                   name="sender-first-name"
               >
                   {getFieldDecorator('sender-first-name', {
                       rules: [
                           {
                               required: true,
                               message: 'Please input your first name!',
                           },
                       ],
                     initialValue: newOrder === undefined ? undefined : newOrder['sender-first-name'],
                   })(<Input placeholder="First Name" />)}
               </Form.Item>
             </Col>
           </Row>

           <Row gutter={10}>
             <Col style={{ height: '50px' }} span={9} push={3}>
               <Form.Item
                   name="sender-phone-number"
               >
                   {getFieldDecorator('sender-phone-number', {
                       rules: [
                           {
                               required: true,
                               message: "Please enter your phone number!",
                           }
                           ],
                         initialValue: newOrder === undefined ? undefined : newOrder['sender-phone-number'],
                   }
                   )(<Input placeholder="Phone Number" />)}
               </Form.Item>
             </Col>
             <Col style={{ height: '50px' }} span={9} push={3}>
               <Form.Item
                   name="sender-email"
               >
                   {getFieldDecorator('sender-email', {
                       rules: [
                           {
                               required: true,
                               message: "Please enter your email!",
                           }
                       ],
                     initialValue: newOrder === undefined ? undefined : newOrder['sender-email'],
                   }) (<Input placeholder="Email Address" />)}
               </Form.Item>
             </Col>
           </Row>
           <Row>
             <Col style={{ height: '50px' }} span={12} push={3}>
               <Form.Item
                   name="Street_Address_1"
               >
                   {getFieldDecorator('sender-address', {
                       rules: [
                           {
                               required: true,
                               message: "Please enter pick-up address!",
                           }
                       ],
                     initialValue: newOrder === undefined ? undefined : newOrder['sender-address'],
                   }) (<Input placeholder="Street Address" />)}
               </Form.Item>
             </Col>
               <Col style={{ height: '50px' }} span={6} push={3}>
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
                           initialValue: newOrder === undefined ? undefined : newOrder['sender-zip-code'],
                       }) (<Input placeholder="Zip code" />)}
                   </Form.Item>
               </Col>

           </Row>

           <h3>Receiver Information</h3>
           <Row gutter={10}>
             <Col style={{ height: '50px' }} span={9} push={3}>
               <Form.Item
                   name="receiver-last-name"
               >
                 {getFieldDecorator(
                     'receiver-last-name', {
                       rules : [
                         {
                           required: true,
                           message: 'Please input receiver last name!',
                         },
                       ],
                       initialValue: newOrder === undefined ? undefined : newOrder['receiver-last-name'],
                     }
                 )(<Input placeholder="Last Name" />)}
               </Form.Item>
             </Col>
             <Col style={{ height: '50px' }} span={9} push={3}>
               <Form.Item
                   name="receiver-first-name"
               >
                 {getFieldDecorator('receiver-first-name', {
                   rules: [
                     {
                       required: true,
                       message: 'Please input receiver first name!',
                     }
                   ],
                   initialValue: newOrder === undefined ? undefined : newOrder['receiver-first-name'],
                 })(<Input placeholder="First Name" />)}
               </Form.Item>
             </Col>
           </Row>
           <Row gutter={10}>
             <Col style={{ height: '50px' }} span={9} push={3}>
               <Form.Item
                   name='receiver-phone-number'
               >
                 {getFieldDecorator('receiver-phone-number', {
                       rules: [
                         {
                           required: true,
                           message: "Please enter receiver phone number!",
                         }
                       ],
                   initialValue: newOrder === undefined ? undefined : newOrder['receiver-phone-number'],
                     }
                 )(<Input placeholder="Phone Number" />)}
               </Form.Item>
             </Col>
             <Col style={{ height: '50px' }} span={9} push={3}>
               <Form.Item
                   name="receiver-email"
               >
                 {getFieldDecorator('receiver-email', {
                   rules: [
                     {
                       required: true,
                       message: "Please enter receiver email!",
                     }
                   ],
                   initialValue: newOrder === undefined ? undefined : newOrder['receiver-email'],
                 }) (<Input placeholder="Email Address" />)}
               </Form.Item>
             </Col>
           </Row>
           <Row>
             <Col style={{ height: '50px' }} span={12} push={3}>
               <Form.Item
                   name="receiver-address-1"
               >
                 {getFieldDecorator('receiver-address-1', {
                   rules: [
                     {
                       required: true,
                       message: "Please enter destination!",
                     }
                   ],
                   initialValue: newOrder === undefined ? undefined : newOrder['receiver-address'],
                 }) (<Input placeholder="Street Address" />)}
               </Form.Item>
             </Col>
               <Col style={{ height: '50px' }} span={6} push={3}>
                   <Form.Item
                       name="receiver-zip-code"
                   >
                       {getFieldDecorator('receiver-zip-code', {
                           rules: [
                               {
                                   required: true,
                                   message: "Please enter receiver zip code!",
                               }
                           ],
                           initialValue: newOrder === undefined ? undefined : newOrder['receiver-zip-code'],
                       }) (<Input placeholder="Zip code" />)}
                   </Form.Item>
               </Col>
           </Row>

           <h3>Package Information</h3>
           <Row gutter={10}>
             <Col style={{ height: '50px' }} span={4} push={3}>
               <Form.Item
                   name="length"
               >
                 {getFieldDecorator('package-length', {
                   rules: [
                     {
                       required: true,
                       message: "Please enter package length in cm!",
                     }
                   ],
                   initialValue: newOrder === undefined ? undefined : newOrder['package-length'],
                 }) (<Input placeholder="Length(cm)" />)}
               </Form.Item>
             </Col>
             <Col style={{ height: '50px' }} span={4} push={3}>
               <Form.Item
                   name="width"
               >
                 {getFieldDecorator('package-width', {
                   rules: [
                     {
                       required: true,
                       message: "Please enter package width in cm!",
                     }
                   ],
                   initialValue: newOrder === undefined ? undefined : newOrder['package-width'],
                 }) (<Input placeholder="Width(cm)" />)}
               </Form.Item>
             </Col>
             <Col style={{ height: '50px' }} span={5} push={3}>
               <Form.Item
                   name="height"
               >
                 {getFieldDecorator('package-height', {
                   rules: [
                     {
                       required: true,
                       message: "Please enter package height in cm!",
                     }
                   ],
                   initialValue: newOrder === undefined ? undefined : newOrder['package-height'],
                 }) (<Input placeholder="Height(cm)" />)}
               </Form.Item>
             </Col>

             <Col style={{ height: '50px' }} span={5} push={3}>
               <Form.Item
                   name="weight"
               >
                 {getFieldDecorator('package-weight', {
                   rules: [
                     {
                       required: true,
                       message: "Please enter package weight in kg!",
                     }
                   ],
                   initialValue: newOrder === undefined ? undefined : newOrder['package-weight'],
                 }) (<Input placeholder="Weight(kg)" />)}
               </Form.Item>
             </Col>
           </Row>
           <Row>
             <Col style={{ height: '50px' }} span={5} push={3}>
               <Form.Item
                   name="RobotOrDrone"
                   rules={[
                     {
                       required: true,
                       message: "Choose your carrier type"
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
         </Form>
     );
   }
}

const ShipInfo = Form.create()(ShipInfoForm);
export default ShipInfo;


