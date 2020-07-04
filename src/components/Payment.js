import React, {useState} from 'react';
// import logo from './logo.svg';
// import '../App.css';
import StripeCheckout from "react-stripe-checkout"

function Payment() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 20,
    productBy:"facebook"
  })

  const makePayment = token =>{
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:8282/payment`,{
      method: "POST",
      headers,
      body: JSON.stringigy(body)
    }).then(response => {
      console.log ("RESPONS ", response)
      const {status} = response
      console.log("STATUS",status)
    })
      .catch(error => console.log(error))
  }


  return (
    <div className="Payment">
      
      {/* <header> */}
        <StripeCheckout 
          stripeKey = "pk_test_51GzS1qDEz20aCkSvkHFcDZezPnwnWA31xk3PquMhR2hI4skg5zTnDIhJgQsVsQpFt7lrxpUB3tiFPQrdCliBKkMx008Hz3fjDw"
          token = "makePayment" 
          name  = "Buy Deliver Around"
          amount = {product.price*100}
          >
            <button className = "payment-button" type="primary"> Click to pay ${product.price} </button>
        </StripeCheckout>
      {/* </header> */}
    </div>
  );
}
export default Payment;

// class Payment extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             productname: "React from FB",
//             price: 20,
//             productBy:"facebook"
//         }
//     }

//     makePayment = token =>{
//         const body = {
//           token,
//           productInfo = {this.state.product}
//         }
//         const headers = {
//           "Content-Type": "application/json"
//         }
//         return fetch(`http://localhost:8282/payment`,{
//           method: "POST",
//           headers,
//           body: JSON.stringigy(body)
//         }).then(response => {
//           console.log ("RESPONS ", response)
//           const {status} = response
//           console.log("STATUS",status)
//         })
//           .catch(error => console.log(error))
//       }


//     render() {
//         return (
//             <div className="App">
//               <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
        
//                 <a
//                   className="App-link"
//                   href="https://reactjs.org"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Learn React
//                 </a>
//                 <StripeCheckout 
//                   stripeKey = "pk_test_51GzS1qDEz20aCkSvkHFcDZezPnwnWA31xk3PquMhR2hI4skg5zTnDIhJgQsVsQpFt7lrxpUB3tiFPQrdCliBKkMx008Hz3fjDw"
//                   token = "makePayment" 
//                   name  = "Buy Deliver Around"
//                   amount = {product.price*100}
//                   >
//                   <button className = "btn-large pink" > Buy Deliver Around for ${product.price} </button>
//                 </StripeCheckout>
//               </header>
//             </div>
//           );
//     }
// }

// export default Payment;
