const cors = require("cors");
const express = require("express");
//add a stripe key
const stripe = require("stripe")("sk_test_51GzS1qDEz20aCkSvZc61RLsXnHJkuRZ5lRIYDNJcoqsoYwsy3tErXCwLgYbcDogk7NPTAeCYdCMm7c0QB7Nh9SD800cv6BXnly");
const uuid = require("uuidv4");

const app = express();


//middleware
app.use(express.json());
app.use(cors());


//routes
app.get("/", (req, res) => {
    res.send("IT WORKS AT MYSITE");
});

app.post("/payment",(req,res) => {

    const{product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    const idempontenctKey = uuid;

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            decription: `purchase of product.name`,



        },{idempontenctKey});
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

});

//listen
app.listen(8282,() => console.log("LISTENING AT PORT 8282"));