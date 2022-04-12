const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema= Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    images:{type:Array,required:true},
    inStock: { type: Number, required: true },
    orderBy:{type:Schema.Types.ObjectId,ref:'user'}
})
module.exports=Product=mongoose.model('product',ProductSchema)