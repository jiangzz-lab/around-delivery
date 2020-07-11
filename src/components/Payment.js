import React, {createRef} from 'react';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Spin, message } from 'antd';

class CheckoutForm extends React.Component {

  handleSubmit = async (event) => {
    event.preventDefault();
    const {stripe, elements} = this.props;
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log(error.message);
    } else {
      console.log(paymentMethod);
      const { price } = this.props;
      const orderData = {
        price: price,
        currency: "usd",
        paymentMethodId: paymentMethod['id'],
      }
      const { togglePaymentStatus, moveNext } = this.props;
      togglePaymentStatus(true);
      fetch("http://localhost:5000/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      }).then((response) =>
      response.json()
      ).then((data) => {
        console.log(data);
        togglePaymentStatus(false);
        moveNext();
      }).catch((error) => {
        console.log(error);
        message.error("Payment failed, please check your card information!")
      });
    }
  };

  render() {
    const CARD_ELEMENT_OPTIONS = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };
    const { price } = this.props;
    const { isProcessingPayment } = this.props;
    return (
        <div>
          <p className="price-tag"> ${price} </p>
          <form className="card-form" onSubmit={this.handleSubmit}>
            <CardElement className="card-element" options={CARD_ELEMENT_OPTIONS}/>
          </form>
          { isProcessingPayment? <Spin className='payment-processing' tip="Processing ..." /> : null }
        </div>
    );
  }
}

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = createRef();
  }

  handlePay = (event) => {
    this.formRef.current.handleSubmit(event);
  }

  render(){
    return(
        <ElementsConsumer>
          {({stripe, elements}) => {
            console.log('stripe inside ElementConsumer -->', stripe);
            console.log('elements inside ElementConsumer -->', elements);
            return <CheckoutForm
                stripe={stripe}
                elements={elements}
                ref={this.formRef}
                togglePaymentStatus={this.props.togglePaymentStatus}
                moveNext={this.props.moveNext}
                price={this.props.price}
                isProcessingPayment={this.props.isProcessingPayment}
            />;
          }
          }
        </ElementsConsumer>
    );
  }
}

export default Payment;