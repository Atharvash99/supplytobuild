const express = require('express')
const app = express()
const path=require('path')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51KYucOSCY09m4IvDhMGb7CHzanbh3HDkF04W2kb3vzSra8WhaXm0cyMC8AKdCaVZ3ySVdncEQhYXGDGxhpwqOLZ300USPuJMGT')
const UserRoute = require('./Route/UserRoute')
const ProductRoute = require('./Route/ProductRoute')
const Order = require('./Modal/Order')
const jwt = require('jsonwebtoken')
const User = require('./Modal/User')
const OrderRoute=require('./Route/OrderRoute')
app.use(express.json())
app.use(express.static('public'))
mongoose.connect('mongodb+srv://admin:Admin123@cluster0.seps5.mongodb.net/supply2build?retryWrites=true&w=majority' ,{ useNewUrlParser: true } )
    .then(res => { console.log("Connected to DB") })
app.use('/api/user', UserRoute)
app.use('/api/product', ProductRoute)
app.use('/api/order',OrderRoute)
app.post('/payment', (req, res) => {
    const idempotencyKey = uuidv4()
    const { userToken, productDetail, token } = req.body
    jwt.verify(userToken, "NULL", (err, decoded) => {
        if (err)
            return res.status(401).json(err)
        User.findById({ _id: decoded.userId }, (err, user) => {
            if (err)
                return res.status(401).json(err)
            if (!user)
                return res.json("login")
            const newOrder = new Order({
                name: productDetail.name, price: productDetail.price, qty: productDetail.qty,
                line: token.card.address_line1, email: token.email, country: token.card.address_country,
                city: token.card.address_city,user:decoded.userId
            })
            newOrder.save((err) => {
                if (err)
                    return res.status(401).json(err)
            })
        })
    })
    return stripe.customers.create({
        email: token.email,
        source: token.id,
        name: token.name,
        address: {
            line1: token.card.address_line1,
            postal_code: token.card.address_zip,
            city: token.card.address_city,
            country: token.card.address_country
        }
    })
        .then(customer => {
            stripe.charges.create({
                amount: productDetail.price * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: productDetail.name
            }, { idempotencyKey })
        }).then(result => { res.status(200).json("Success") })
        .catch(err => { console.log(err) })
})
const port = process.env.PORT || 5000
if (process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname, "client/build")))
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"))
    })
}
app.listen(port, () => { console.log('Server Started...') })