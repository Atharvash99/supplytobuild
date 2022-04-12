const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrderModal = new Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    qty: { type: Number, require: true },
    line: { type: String, require: true },
    city: { type: String, require: true },
    country: { type: String, require: true },
    email: { type: String, require: true },
    user:{type:Schema.Types.ObjectId,ref:'user'}
})
module.exports=Order=mongoose.model('order',OrderModal)