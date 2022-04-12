const { Router } = require('express')
const Order=require('../Modal/Order')
const jwt=require('jsonwebtoken')
const OrderRoute = Router()
OrderRoute.post('/', (req, res) => {
    jwt.verify(req.body.token, "NULL", (err, decoded) =>{
        if (err)
            return res.status(401).json(err)
        Order.find({ user: decoded.userId }, (err, orders) => {
            if (err)
                return res.status(401).json(err)
            if (!orders)
                return res.json("No Order's")
            return res.json({orders:orders})
        })
    })
})
module.exports=OrderRoute